import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/server/client";
import { withIronSession } from "../../../lib/server/withSession";

export interface ResponseType {
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.query.id) {
    const tweetDetail = await client.tweett.findUnique({
      where: {
        id: +req.query.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!tweetDetail) {
      return res.json({ ok: false });
    }
    return res.json({ tweetDetail });
  }
  return;
}

export default withIronSession(handler);
