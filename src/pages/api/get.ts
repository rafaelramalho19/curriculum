// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma-client';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    number?: Number,
    error?: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const nuke = await prisma.nuke.findFirst();

    if (!nuke) {
        return res.status(200).json({ error: true })
    }

    return res.status(200).json({ number: nuke.number })
}
