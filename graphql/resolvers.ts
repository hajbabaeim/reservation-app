import prisma from '../lib/prisma'

export const resolvers = {
  Query: {
    reservations: () => {
      return prisma.reservation.findMany()
    },
  },
}