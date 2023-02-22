import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma-client';

type Data = {
  newNumber: Number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

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
