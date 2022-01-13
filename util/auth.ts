import jwt from "jsonwebtoken";

const auth = (req: any): any => {
  // Reject if no secret key has been set
  if (process.env.SECRET_KEY === undefined) return null;

  // Parse the cookies on the request
  const token = req.cookies.token;

  // Verify
  if (token) {
    let claims;
    try {
      claims = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return null;
    }
    return claims;
  }
};

export default auth;
