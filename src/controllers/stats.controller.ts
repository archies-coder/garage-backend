import { NextFunction, Request, Response } from 'express'
import { fetchAll } from '../services/stats.service'

const getStatsData = async (req: Request, res: Response, next: NextFunction) => {
  const getData = await fetchAll()
  res.send({
    data: getData,
  })
}

export { getStatsData }
