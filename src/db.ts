import { PrismaClient } from "@prisma/client"
import { timeStamp } from "console";
const prisma = new PrismaClient()

async function aa() {
    prisma.project.create({
        
    })
}