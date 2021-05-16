import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userModel from './../models/user.model'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const token: string | undefined = req.query.token?.toString()
    const token: string | undefined = req.headers.authorization?.toString().split(' ')[1]
    if (token) {
      const secret: string = process.env.JWT_SECRET || 'sometopsecretstring'
      const verificationResponse = jwt.verify(token, secret)
      const userId = (verificationResponse as any)._id
      const findUser = await userModel.findById(userId)

      if (findUser) {
        ;(req as any).user = findUser
        next()
      } else {
        next(new Error('No User Found'))
      }
    } else {
      next(new Error('Authentication token missing'))
    }
  } catch (error) {
    next(new Error('Something Went Wrong'))
  }
}
