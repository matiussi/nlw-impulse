import { PrismaClient } from '@prisma/client';

//Responsável por realizar a conexão com o banco de dados
const prismaClient = new PrismaClient();

export default prismaClient;