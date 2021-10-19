import prismaClient from '../prisma';

import {io} from '../app';

class CreateMessageService {
   //Inserindo a mensagem no banco e retornando todas as informações do usuário
   async execute(text: string, user_id: string){
      const message = await prismaClient.message.create({
         data:{
            text,
            user_id
         },
         include:{
            user: true
         }
      });

      //Após uma nova mensagem ser criada, 
      //ela será enviada aos usuários conectados
      const infoWS = {
         text: message.text,
         user_id: message.user_id,
         created_at: message.created_at,
         user:{
            name: message.user.name,
            avatar_url: message.user.avatar_url
         }
      }

      io.emit("new_message", infoWS);
      
      return message;
   }
}

export {CreateMessageService}