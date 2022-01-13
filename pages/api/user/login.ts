import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import errors from "../../../util/errors";
import prisma from "../../../util/prisma";

// API Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Reject empty request body or if no secret key has been set
  if (!req.body) return res.status(400).json(errors.noBody);
  if (process.env.SECRET_KEY === undefined)
    return res.status(500).json(errors.serverErr);

  // Retrieve form data
  const { email, password } = req.body;

  // Retrieve user data from db
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  // Reject if user can't be found
  if (!user) return res.status(401).json(errors.badLogin);

  // Check password
  const bcrypt = require("bcrypt");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json(errors.badLogin);

  // Generate and sign JWT with SECRET_KEY environment variable, storing some
  // user data as claims
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email,
    },
    process.env.SECRET_KEY
  );

  // Store user token in HTTP-only cookie
  const cookie = require("cookie");
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    })
  );

  // Return successful response
  return res.status(200).json({ success: true });
};

export default handler;
