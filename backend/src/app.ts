import * as express from 'express';
import "dotenv/config";
import * as http from "http";
import { Server } from "socket.io";
import * as cors from 'cors';

import { router }  from './routes';

const app = express();
app.use(cors());

//Subindo o servidor com http
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
   cors:{
      origin: "*"
   }
});

//Escutando o evento "connection" para verificar se algum usuário se conectou
io.on("connection", socket => {
   console.log(`Usuário conectado no socket ${socket.id}`);
})

app.use(express.json());

app.use(router);

//Rota criada para realizar a autenticação através do github
//Necessário obter o client id e secret a partir de https://github.com/settings/developers
app.get("/github", (request, response) => {
   response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
   );
});

app.get("/signin/callback", (request, response) =>{
   const { code } = request.query;

   return response.json(code);
})


export { serverHttp, io } ;