import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
