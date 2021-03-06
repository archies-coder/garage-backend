import { ICreateNewBill } from './../dtos/bill.dtos'
import { INewBillDTO } from '../dtos/bill.dtos'
import billModel, { IBill } from '../models/bill.model'
import vehicleEntryModel from '../models/vehicleEntry.model'

const populateBillWithvehicleDataConfig = {
  path: 'vehicleEntryId',
  select: 'vehicleId',
  populate: { path: 'vehicleId', select: 'customer' },
}

function filterBillData(data: IBill[]) {
  const resp: any[] = []
  data.map(
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
      return resp.push({
        _id,
        vehicleEntryId,
        customerName,
        customerAddress,
        customerMobile,
        name,
        cost,
        createdAt,
        updatedAt,
      })
    },
  )
  return resp
}

const fetchAllBills = async () => {
  const allData = await billModel.find().populate(populateBillWithvehicleDataConfig)

  return filterBillData(allData)
}
const formatBills = (bills: IBill[]) => {
  return bills.map(item => {
    const {
      _id,
      vehicleEntryId: { _id: vehicleEntryId, vehicleId },
      name,
      cost,
      createdAt,
      updatedAt,
    } = item
    const { customerName, customerAddress, customerMobile } = vehicleId.customer
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
}

const fetchBillByID = async (id: string) => {
  return await billModel.findOne({ id })
}

const fetchBillsByVehicleEntryID = async (vehicleEntryId: string) => {
  const bills = await billModel
    .find({ vehicleEntryId })
    .populate(populateBillWithvehicleDataConfig)
  return filterBillData(bills)
}

const createBillAndUpdateVehicleEntry = async (input: INewBillDTO) => {
  const { vehicleEntryId, items } = input

  const data = items.map(({ name, cost }) => ({
    vehicleEntryId,
    name,
    cost,
  }))

  const newBillsArray = await billModel.insertMany(data)

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

export {
  fetchAllBills,
  fetchBillByID,
  createBillAndUpdateVehicleEntry,
  fetchBillsByVehicleEntryID,
}
