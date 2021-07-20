import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getGroupToMap () {  
    const allGroupToMaps = await prisma.gROUP_TO_MAP.findMany()
    console.log(JSON.stringify(allGroupToMaps, null, 2))
}

getGroupToMap()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })