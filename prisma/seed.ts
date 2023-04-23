// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { cars } from '../data/cars'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: process.env.ADMIN_USERNAME,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10),
      email: process.env.ADMIN_EMAIL as string,
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
