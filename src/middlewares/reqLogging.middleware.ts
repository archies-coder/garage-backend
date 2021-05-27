import { Request, Response, NextFunction } from 'express'
import reqLogModel from '../models/reqLog.model'

export const requestLoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parseIp = (req: Request) =>
    (req.headers['x-forwarded-for'] as string)?.split(',').shift() ||
    req.socket?.remoteAddress

  await reqLogModel.create({
    ip: parseIp(req),
    resource: req.path,
    method: req.method,
  })
  next()
}
