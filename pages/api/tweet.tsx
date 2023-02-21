import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/server/client";
import { withIronSession } from "../../lib/server/withSession";

export interface ResponseType {
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const tweets = await client.tweett.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!tweets) {
    return res.json({ ok: false });
  }
  return res.json({ tweets });
}

export default withIronSession(handler);
