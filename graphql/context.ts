// graphql/context.ts
import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function createContext({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  const session = await getSession(req)

  // if the user is not logged in, return null
  if (!session || typeof session === 'undefined') return {}

  const { user, accessToken } = session

  return {
    user,
    accessToken,
  }
}