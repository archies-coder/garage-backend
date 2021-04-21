import { IVehicleDTO } from './../dtos/vehicle.dtos'
import VehicleModel from '../models/vehicle.model'

const fetchAll = async () => {
  return await VehicleModel.find()
}

const createNewVehicle = async (vehicle: IVehicleDTO) => {
  return await VehicleModel.create(vehicle)
}

export { fetchAll, createNewVehicle }
