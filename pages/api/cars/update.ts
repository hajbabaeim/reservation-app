import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, make, model, year } = req.body;

  try {
    const car = await prisma.car.update({
      where: { id: Number(id) },
      data: {
        make,
        model,
        year,
      },
    });

    res.status(200).json({ car });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
