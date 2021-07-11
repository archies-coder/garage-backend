import { ICreateNewBill } from './../dtos/bill.dtos'
import { INewBillDTO } from '../dtos/bill.dtos'
import billModel from '../models/bill.model'
import vehicleEntryModel from '../models/vehicleEntry.model'

const fetchAllBills = async () => {
  const allData = await billModel.find().populate({
    path: 'vehicleEntryId',
    select: 'vehicleId',
    populate: { path: 'vehicleId', select: 'customer' },
  })
  debugger
  const data = allData.map(
    ({ _id, vehicleEntryId: vehicleEntryDetails, name, cost, createdAt, updatedAt }) => {
      if (!vehicleEntryDetails) {
        return new Error('No vehicle Entry found')
      }
      const { _id: vehicleEntryId } = vehicleEntryDetails
      const {
        customerName,
        customerAddress,
        customerMobile,
      } = vehicleEntryDetails.vehicleId.customer
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
    },
  )
  return data
}

const fetchBillByID = async (id: string) => {
  return await billModel.findOne({ id })
}

const createBillAndUpdateVehicleEntry = async (input: INewBillDTO) => {
  const { vehicleEntryId, items } = input

  const data = items.map(({ name, cost }) => ({
    vehicleEntryId,
    name,
    cost,
  }))

  const newBillsArray = await billModel.insertMany(data)
  debugger
  const ids: string[] = newBillsArray.map(b => b.id)
  const updatedVehiclEntry = await vehicleEntryModel.findByIdAndUpdate(vehicleEntryId, {
    $push: {
      billInfo: {
        $each: ids,
      },
    },
  })
  if (!updatedVehiclEntry) {
    return new Error('Failed to update vehicle entry: ')
  }
  return { newBillId: newBillsArray, updatedVehicleEntry: updatedVehiclEntry?.id }
}

export { fetchAllBills, fetchBillByID, createBillAndUpdateVehicleEntry }
