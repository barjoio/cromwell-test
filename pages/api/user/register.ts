import { NextApiRequest, NextApiResponse } from "next";
import errors from "../../../util/errors";
import prisma from "../../../util/prisma";
import regexp from "../../../util/regexp";

// API Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Reject empty request body
  if (!req.body) return res.status(400).json(errors.noBody);

  // Retrieve form data
  const { name, email, password, confirmPassword } = req.body;

  // Validate form data
  const nameValid = name != "";
  const emailValid = email != "" && regexp.email.test(email);
  const passwordValid = password.length >= 8;
  const confirmPasswordValid = password === confirmPassword;

  // Reject invalid form data
  if (!nameValid) return res.status(409).json(errors.noName);
  if (!emailValid) return res.status(400).json(errors.emailInvalid);
  if (!passwordValid) return res.status(400).json(errors.password);
  if (!confirmPasswordValid) return res.status(400).json(errors.passConf);

  // Encrypt password
  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    // Return successful response
    res.status(200).json({ success: true, user });
  } catch (e: any) {
    // Catch violation to unique constraint (for emails)
    if (e.code === "P2002") return res.status(409).json(errors.emailTaken);
  }
};

export default handler;
