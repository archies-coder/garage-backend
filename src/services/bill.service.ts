import { INewBillDTO } from '../dtos/bill.dtos'
import billModel from '../models/bill.model'
import vehicleEntryModel from '../models/vehicleEntry.model'

const fetchAllBills = async () => {
  const datas = await billModel.find().populate({
    path: 'vehicleEntryId',
    select: 'vehicleId',
    populate: { path: 'vehicleId', select: 'customer' },
  })
  const data = datas.map(item => {
    const { _id, vehicleEntryId: vehicleEntryDetails, name, cost, createdAt, updatedAt } = item
    const { _id: vehicleEntryId } = vehicleEntryDetails
    const { customerName, customerAddress, customerMobile } = vehicleEntryDetails.vehicleId.customer
    return {
      _id,
      vehicleEntryId,
      customerName,
      customerAddress,
      customerMobile,
      name,
      cost,
      createdAt,
      updatedAt,
    }
  })
  return data
}

const fetchBillByID = async (id: string) => {
  return await billModel.findOne({ id })
}

const createBillAndUpdateVehicleEntry = async (input: INewBillDTO) => {
  const { vehicleEntryId, name, cost } = input
  const newBill = await billModel.create({ vehicleEntryId, name, cost })
  const updatedVehiclEntry = await vehicleEntryModel.findByIdAndUpdate(vehicleEntryId, {
    $push: { billInfo: newBill.id },
  })
  if (!updatedVehiclEntry) {
    return new Error('Failed to update vehicle entry: ')
  }
  return { newBillId: newBill.id, updatedVehicleEntry: updatedVehiclEntry?.id }
}

export { fetchAllBills, fetchBillByID, createBillAndUpdateVehicleEntry }
