import { prisma } from '@/server/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

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
        const { name, model, buildDate } = req.body;
        const car = await prisma.car.create({
            data: {
              name,
              model,
              buildDate,
            },
          });
      
          return res.status(201).json({ car });
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }      
  }

  if (req.method === 'DELETE') {
    try {
        const { id } = req.body;
        const car = await prisma.car.delete({
            where: { id: Number(id) },
          });
      
        // return res.status(204).json({ car });
        return res.status(204).end()
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, name, model, buildDate } = req.body
      const car = await prisma.car.update({
        where: { id: Number(id) },
        data: {
          name,
          model,
          buildDate,
        },
      })
      return res.status(200).json({ car })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
