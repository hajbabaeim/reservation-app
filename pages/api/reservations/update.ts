import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, startDate, endDate, userId, carId } = req.body;

  try {
    const reservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: {
        startDate,
        endDate,
        userId,
        carId,
      },
    });

    res.status(200).json({ reservation });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
