import { PrismaClient } from '@prisma/client';
import { assignments, projects, users } from './data/data';

const prisma = new PrismaClient()

async function main() {
    // // ... you will write your Prisma Client queries here
    // // // // First - we add user
    // await prisma.user.createMany({
    //     data: users
    // })
  
    const allUsers = await prisma.user.findMany();
    console.log(JSON.stringify(allUsers))
  
    // // // // First user, now project
    // await prisma.project.createMany({
    //     data: projects
    // })
  
    const allProjects = await prisma.project.findMany();
    console.log(JSON.stringify(allProjects))
  
    // // // // Now projectUser, so we need user uuid
    // await prisma.projectUser.createMany({
    //     data: assignments
    // })
  
    const allAssignments = await prisma.projectUser.findMany();
    console.log(JSON.stringify(allAssignments))
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })