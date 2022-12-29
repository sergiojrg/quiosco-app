import { PrismaClient } from "@prisma/client"

export default async function handler(req,res){
    const prisma = new PrismaClient()

    if(req.method === 'POST'){
        const idOrden = req.query.id

        const ordenActualizada = await prisma.orden.update({
            where:{
                id: parseInt(idOrden)
            },
            data:{
              estado: true  
            }
        })

        res.status(200).json(ordenActualizada)
    }
}