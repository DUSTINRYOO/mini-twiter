import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/server/client";
import { withIronSession } from "../../../../lib/server/withSession";

export interface ResponseType {
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweetDetail = await client.tweett.findUnique({
    where: {
      id: +id.toString(),
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
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        tweettId: tweetDetail?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  return res.json({ tweetDetail, isLiked });
}

export default withIronSession(handler);
