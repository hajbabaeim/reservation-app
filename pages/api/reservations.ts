import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/server/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return res.status(403).send('Unauthorized')
  }

  const userId = session.user.id

  if (req.method === 'POST') {
    try {
      const { startDate, endDate, userId, carId } = req.body
      const reservation = await prisma.reservation.create({
        data: {
          startDate,
          endDate,
          userId,
          carId,
        },
      })

      return res.status(201).json({ reservation })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body
      const reservation = await prisma.reservation.delete({
        where: { id: Number(id) },
      })

      // return res.status(204).json({ reservation });
      return res.status(204).end()
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { startDate, endDate, userId, carId } = req.body
      const reservation = await prisma.reservation.update({
        where: { id: Number(id) },
        data: {
          startDate,
          endDate,
          userId,
          carId,
        },
      })
      return res.status(200).json({ reservation })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
