import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/server/client";
import { withIronSession } from "../../lib/server/withSession";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const user = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  if (!req.session.user) {
    return res.status(401).json({ ok: false });
  }
  return res.json({ ok: true, user });
}

export default withIronSession(handler);
