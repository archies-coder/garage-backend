import vehicleModel from '../models/vehicle.model'

const fetchCustomer = async () => {
  const datas = await vehicleModel.find()
  const data = datas.map(item => {
    const { customer } = item
    const { customerName, customerAddress, customerMobile } = customer
    return {
      customerName,
      customerAddress,
      customerMobile,
    }
  })
  return data
}

export { fetchCustomer }
