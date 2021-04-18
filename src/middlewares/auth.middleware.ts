import jwt = require('jsonwebtoken')
import userModel = require('../models/user.model.js')

const authMiddleware = async (req: any, next: any) => {
  try {
    const token = req.query.token
    if (token) {
      const secret: any = process.env.JWT_SECRET
      const verificationResponse = jwt.verify(token, secret)
      const userId = verificationResponse._id
      const findUser = await userModel.findById(userId)

      if (findUser) {
        req.user = findUser
        next()
      } else {
        next(new Error('Wrong authentication token'))
      }
    } else {
      next(new Error('Authentication token missing'))
    }
  } catch (error) {
    next(new Error('Wrong authentication token'))
  }
}

module.exports = authMiddleware
