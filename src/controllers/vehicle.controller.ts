import { IVehicle } from '../models/vehicle.model'
import { NextFunction, Request, Response } from 'express'
import { fetchAll } from '../services/vehicle.service'
import { IVehicleDTO } from '../dtos/vehicle.dtos'

const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
  const vehicles: IVehicle[] = await fetchAll()
  res.send({
    data: vehicles,
    message: 'All Vehicles',
  })
}

const postVehicle = async (req: Request, res: Response) => {
  const vehicle: IVehicleDTO = req.body
}

export { getVehicles, postVehicle }
