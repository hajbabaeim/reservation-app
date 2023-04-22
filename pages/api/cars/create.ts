import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { make, model, year } = req.body;

  try {
    const car = await prisma.car.create({
      data: {
        make,
        model,
        year,
      },
    });

    res.status(201).json({ car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}