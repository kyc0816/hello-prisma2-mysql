import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getMap () {
    const allOrgMaps = await prisma.sEAT_MAP_INFO.findMany()
    console.log(JSON.stringify(allOrgMaps, null, 2))
}

getMap()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })