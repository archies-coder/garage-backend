import { NextFunction, Request, Response } from 'express'
import { fetchAll } from '../services/stats.service'

const getStatsData = async (req: Request, res: Response, next: NextFunction) => {
  const date = req.query.date
  let data
  date ? (data = await fetchAll(date)) : await fetchAll()
  res.send({
    data: data,
  })
}

export { getStatsData }
