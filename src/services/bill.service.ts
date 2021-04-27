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
  const { vehicleEntryId, name, cost } = input
  const newBill = await billModel.create({ vehicleEntryId, name, cost })
  /*const updatedVehiclEntry = await vehicleEntryModel.findByIdAndUpdate(vehicleEntryId, {
    $push: { billInfo: newBill.id },
  })*/
  return newBill
}

export { fetchAllBills, fetchBillByID, createBillAndUpdateVehicleEntry }
