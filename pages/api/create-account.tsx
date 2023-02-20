import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/server/client";
import { withIronSession } from "../../lib/server/withSession";

export interface ResponseType {
  ok: boolean;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const created = await client.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });
  if (!created) {
    return res.json({ ok: false });
  }
  return res.json({ ok: true });
}

export default withIronSession(handler);
