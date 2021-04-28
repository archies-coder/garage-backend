import jwt from 'jsonwebtoken'

export const createToken = (user: { _id: any }) => {
  const dataStoredInToken = { _id: user._id }
  const secret = process.env.JWT_SECRET || 'supersecret'
  const expiresIn = 60 * 60

  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  }
}
