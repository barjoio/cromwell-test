import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../util/auth";

// API Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Reject unauthorised requests
  if (!auth(req)) return res.status(401).end();

  // Unset token cookie
  const cookie = require("cookie");
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).end();
};

export default handler;
