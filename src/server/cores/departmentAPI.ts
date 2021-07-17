import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getDepartment () {
    const allOrgGroups = await prisma.oRG_GROUP_INFO.findMany()
    console.log(JSON.stringify(allOrgGroups, null, 2))
}

getDepartment()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })