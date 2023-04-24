import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/server/db'
import bcrypt from 'bcryptjs'

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
        const { name, email, password, role } = req.body;
        const user = await prisma.user.create({
            data: {
              name,
              email,
              password: await bcrypt.hash(password, 10),
              role: role || 'USER',
            },
          });
      
          return res.status(201).json({ user });
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }      
  }

  if (req.method === 'DELETE') {
    try {
        const { id } = req.body;
        const user = await prisma.user.delete({
            where: { id: Number(id) },
          });
      
        // return res.status(204).json({ user });
        return res.status(204).end()
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, name, email } = req.body
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
        },
      })
      return res.status(200).json({ user })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
