import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getPeople () {
    const allOrgUsers = await prisma.oRG_USER_INFO.findMany()
    console.log(JSON.stringify(allOrgUsers, null, 2))
}

getPeople()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })