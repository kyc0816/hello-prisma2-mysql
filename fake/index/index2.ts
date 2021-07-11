// fake script of '자리 배치도' schema
// (Upload to database)

import { PrismaClient } from '@prisma/client';
import { org_groups, org_groups_to_maps, org_maps, org_maps_to_users, org_users } from '../data/data2';

const prisma = new PrismaClient()

async function main() {

    // Add org_groups
    await prisma.oRG_GROUP_INFO.createMany({
      data: org_groups
    })

    // Add org_maps
    await prisma.sEAT_MAP_INFO.createMany({
      data: org_maps
    })

    // Add org_users
    await prisma.oRG_USER_INFO.createMany({
      data: org_users
    })
  
    // Add org_groups_to_maps
    await prisma.gROUP_TO_MAP.createMany({
      data: org_groups_to_maps
    })

    // Add org_maps_to_users
    await prisma.in_charge_MAP.createMany({
      data: org_maps_to_users
    })

    
  
    const allOrgGroups = await prisma.oRG_GROUP_INFO.findMany();
    console.log(JSON.stringify(allOrgGroups))
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })