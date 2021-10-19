//Sobrescrevendo a Request para aceitar um user_id
declare namespace Express{
   export interface Request {
      user_id: string;
   }
}