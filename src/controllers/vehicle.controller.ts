import { IVehicle } from '../models/vehicle.model'
import { NextFunction, Request, Response } from 'express'
import { createNewVehicle, getVehicle } from '../services/vehicle.service'
import { IVehicleDTO } from '../dtos/vehicle.dtos'

const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
  const vehicles = await getVehicle()
  res.send({
    totalCount: vehicles.length,
    data: vehicles ? [vehicles] : [],
  })
}

const postVehicle = async (req: Request, res: Response) => {
  const vehicleInput: IVehicleDTO = req.body
  if (!vehicleInput) return res.status(422).send('No Requst Body')
  try {
    // TODO check if already exists, send 409 (CONFLICT) if so
    const vehicle = await createNewVehicle(vehicleInput)
    res.send({
      data: vehicle,
    })
  } catch (error) {
    return res.status(error.status).send(error)
  }
}

export { getVehicles, postVehicle }
