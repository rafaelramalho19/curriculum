// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  newNumber: Number
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
      number: {
        increment: 1
      }
    }
  });

  return res.status(200).json({ newNumber: nuke.number })
}
