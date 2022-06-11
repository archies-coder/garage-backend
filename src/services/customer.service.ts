import vehicleModel from '../models/vehicle.model'

const fetchCustomer = async () => {
  const vehicles = await vehicleModel.find()
  return vehicles.map(item => item.customer)
}

export { fetchCustomer }
