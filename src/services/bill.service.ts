import { INewBillDTO } from '../dtos/bill.dtos'
import billModel from '../models/bill.model'
import vehicleEntryModel from '../models/vehicleEntry.model'

const fetchAllBills = async () => {
  return await billModel.find()
}

const fetchBillByID = async (id: string) => {
  return await billModel.findOne({ id })
}

const createBillAndUpdateVehicleEntry = async (input: INewBillDTO) => {
  const { name, cost, vehicleEntryId } = input
  const newBill = await billModel.create({ name, cost })
  const updatedVehiclEntry = await vehicleEntryModel.findByIdAndUpdate(vehicleEntryId, {
    $push: { billInfo: newBill.id },
  })
  if (!updatedVehiclEntry) {
    return new Error('Failed to update vehicle entry: ')
  }
  return { newBillId: newBill.id, updatedVehicleEntry: updatedVehiclEntry?.id }
}

export { fetchAllBills, fetchBillByID, createBillAndUpdateVehicleEntry }
