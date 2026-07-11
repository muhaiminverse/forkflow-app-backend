import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import expressAuth from "express-oauth2-jwt-bearer";
const auth = expressAuth.auth;

declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
      email?: string;
    }
  }
}

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});



const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    if (!auth0Id) {
      return res.sendStatus(401);
    }

    const email = typeof decoded.email === "string" ? decoded.email : undefined;
    const user = await User.findOne({ auth0Id });

    req.auth0Id = auth0Id as string;
    if (email) {
      req.email = email;
    }

    if (user) {
      req.userId = String(user._id);
    }

    next();
  } catch (error) {
    console.error("JWT parse failed", error);
    return res.sendStatus(401);
  }
};

export = {
  jwtCheck,
  jwtParse,
};