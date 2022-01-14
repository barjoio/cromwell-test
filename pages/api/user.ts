import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../util/auth";
import errors from "../../util/errors";
import prisma from "../../util/prisma";

// API Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Reject unauthorised requests
  const claims = auth(req);
  if (!claims) return res.status(401).json(errors.unAuth);

  // Retrieve user data from db
  const user = await prisma.user.findUnique({
    where: {
      id: claims.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  // Reject if user can't be found
  if (!user) return res.status(401).json(errors.noUser);

  // Return successful response
  return res.status(200).json({ success: true, user });
};

export default handler;
