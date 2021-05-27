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
  console.log(parseIp(req), ' ', req.ip)
  console.log('#############################')
  console.log(req.url, req.path)
  await reqLogModel.create({
    ip: req.ip,
    resource: req.path,
    method: req.method,
  })
  next()
}
