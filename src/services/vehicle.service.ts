import { IVehicleDTO } from './../dtos/vehicle.dtos'
import VehicleModel from '../models/vehicle.model'

const fetchAll = async (order: string) => {
  return order === 'DESC'
    ? await VehicleModel.find({}).sort({ _id: -1 })
    : order === 'ASC'
    ? await VehicleModel.find({}).sort({ _id: 1 })
    : await VehicleModel.find()
}

const createNewVehicle = async (vehicle: IVehicleDTO) => {
  return await VehicleModel.create(vehicle)
}

export { fetchAll, createNewVehicle }
