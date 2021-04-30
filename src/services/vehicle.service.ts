import { IVehicleDTO } from './../dtos/vehicle.dtos'
import VehicleModel from '../models/vehicle.model'

const fetchAll = async () => {
  return await VehicleModel.find()
}

const createNewVehicle = async (vehicle: IVehicleDTO) => {
  const { vehicleMake, vehicleModel, vehicleNo, vehicleType, customerName, customerMobile, customerAddress } = vehicle
  const newVehicle = new VehicleModel({ vehicleMake, vehicleModel, vehicleNo, vehicleType })
  console.log(newVehicle)
  newVehicle.customer = {
    customerName,
    customerMobile,
    customerAddress,
  }
  return await newVehicle.save()
}

export { fetchAll, createNewVehicle }
