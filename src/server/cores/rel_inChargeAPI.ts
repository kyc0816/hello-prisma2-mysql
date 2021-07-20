import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getInCharge () {
    const allInChargeMaps = await prisma.in_charge_MAP.findMany()
    console.log(JSON.stringify(allInChargeMaps, null, 2))
}

getInCharge()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })