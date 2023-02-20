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
  const {
    body: { context },
    session: { user },
  } = req;
  const created = await client.tweet.create({
    data: {
      context,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  if (!created) {
    return res.json({ ok: false });
  }
  return res.json({ ok: true });
}

export default withIronSession(handler);
