import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../db/connect';

// You can add more CRUD operations for reservations here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { rows: reservations } = await pool.query('SELECT * FROM reservations');
      res.status(200).json({ reservations });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
