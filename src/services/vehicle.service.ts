import VehicleModel from '../models/vehicle.model'

const fetchAll = async () => {
  return await VehicleModel.find({})
}

export { fetchAll }
