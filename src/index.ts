// fake data of '자리 배치도' schema
// (Read from db)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {

    const allOrgGroups = await prisma.oRG_GROUP_INFO.findMany()
    console.log(JSON.stringify(allOrgGroups, null, 2))

    const allOrgMaps = await prisma.sEAT_MAP_INFO.findMany()
    console.log(JSON.stringify(allOrgMaps, null, 2))

    const allOrgUsers = await prisma.oRG_USER_INFO.findMany()
    console.log(JSON.stringify(allOrgUsers, null, 2))
  
    const allGroupToMaps = await prisma.gROUP_TO_MAP.findMany()
    console.log(JSON.stringify(allGroupToMaps, null, 2))

    const allInChargeMaps = await prisma.in_charge_MAP.findMany()
    console.log(JSON.stringify(allInChargeMaps, null, 2))
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })