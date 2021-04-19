import { IVehicle } from '../models/vehicle.model'
import { NextFunction, Request, Response } from 'express'
import { fetchAll } from '../services/vehicle.service'

const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
  const vehicles: IVehicle[] = await fetchAll()
  res.send({
    data: vehicles,
    message: 'All Vehicles',
  })
}

export { getVehicles }
