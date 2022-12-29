import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(req,res){
    const prisma = new PrismaClient()

    const ordenes = await prisma.orden.findMany({
        where:{
            estado: true
        }
    })

    res.status(200).json(ordenes)

}