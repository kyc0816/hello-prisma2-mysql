// fake script of '자리 배치도' schema
// (Upload to database)

import { PrismaClient } from '@prisma/client';
import { org_groups, org_users } from '../data/data2';
// import { org_groups, org_users } from '../data/data2add';

const prisma = new PrismaClient()

async function main() {

    // Add org_groups
    await prisma.oRG_GROUP_INFO.createMany({
      data: org_groups
    })


    // Add org_users
    await prisma.oRG_USER_INFO.createMany({
      data: org_users
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