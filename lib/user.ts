// lib/user.ts
import pool from './db';
import { User } from '../models/User';

export async function createUser(email: string, password: string): Promise<User> {
  const { rows } = await pool.query<User>(
    'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
    [email, password]
  );
  return rows[0];
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] || null;
}