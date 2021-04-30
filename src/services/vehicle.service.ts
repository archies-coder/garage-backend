import { IVehicleDTO } from './../dtos/vehicle.dtos'
import VehicleModel from '../models/vehicle.model'

const fetchAll = async () => {
  return await VehicleModel.find()
}

const getVehicle = async () => {
  const datas = await fetchAll()
  const data = datas.map(item => {
    const { _id, vehicleMake, vehicleModel, vehicleNo, vehicleType, customer } = item
    const { customerName, customerAddress, customerMobile } = customer
    return { _id, vehicleMake, vehicleModel, vehicleType, vehicleNo, customerName, customerAddress, customerMobile }
  })
  return data
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

export { getVehicle, createNewVehicle }
