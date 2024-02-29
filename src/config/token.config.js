import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { header } from "express-validator"
import { createHash } from "crypto"

config()

export const generateToken = (data, access = true) => {
  const secret = access ? process.env.ACCESS_TOKEN_SECRET : process.env.REF_TOKEN_SECRET
  const expiry = access ? process.env.ACCESS_TOKEN_EXPIRY : process.env.REF_TOKEN_EXPIRY

  if (!secret) {
    throw new Error("Token secret is not configured.")
  }

  return jwt.sign(data, secret, { expiresIn: parseInt(expiry) })
}

export const verifyToken = (token, access = true) => {
  const secret = access ? process.env.ACCESS_TOKEN_SECRET : process.env.REF_TOKEN_SECRET

  if (!secret) {
    throw new Error("Token secret is not configured.")
  }

  return jwt.verify(token, secret)
}

export const hashRefreshToken = (refreshToken) => {
  return createHash("md5").update(refreshToken).digest("hex")
}
