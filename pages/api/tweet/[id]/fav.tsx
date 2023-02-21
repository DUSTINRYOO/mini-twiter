import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/server/client";
import { withIronSession } from "../../../../lib/server/withSession";
import { ResponseType } from "../../me";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.fav.findFirst({
    where: {
      tweettId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweett: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withIronSession(handler);
