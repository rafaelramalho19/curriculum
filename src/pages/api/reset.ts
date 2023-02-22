// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()

  const nuke = await prisma.nuke.update({
    where: {
      id: 1,
    },
    data: {
      number: 0
    }
  });

  return res.status(200).json({ success: 'OK' })
}
