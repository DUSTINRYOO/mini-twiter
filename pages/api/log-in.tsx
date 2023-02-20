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
  const exist = await client.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!exist) {
    return res.json({ ok: false });
  }
  req.session.user = {
    id: exist.id,
  };
  await req.session.save();
  return res.json({ ok: true });
}

export default withIronSession(handler);
