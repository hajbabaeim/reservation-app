// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { cars } from '../data/cars'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Jones',
      email: `admin@doamin.com`,
      role: 'ADMIN',
    },
  })

  await prisma.car.createMany({
    data: cars,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
