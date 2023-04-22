import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { startDate, endDate, carId, userId } = req.body;

  try {
    const reservation = await prisma.reservation.create({
      data: {
        startDate,
        endDate,
        carId,
        userId,
      },
    });

    res.status(201).json({ reservation });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
