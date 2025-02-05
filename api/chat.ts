import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function (req: VercelRequest, res: VercelResponse) {
  res.redirect(301, 'https://discord.gg/QKrKMtCuDg')
}
