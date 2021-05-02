import { IVehicleEntry } from './../models/vehicleEntry.model'
import { IVehicle } from './../models/vehicle.model'
import { IVehicleEntryDTO } from './../dtos/vehicleEntry.dtos'
import vehicleEntryModel from '../models/vehicleEntry.model'
import VehicleModel from '../models/vehicle.model'
import isEmpty from '../utils/isEmpty'

interface IFilterQueries {
  page?: string
  count?: string
  vehicleEntry?: string
  purpose?: string
}

const fetchAll = async (order?: string) => {
  // return order === 'DESC'
  //   ? await VehicleModel.find({}).sort({ _id: -1 })
  //   : order === 'ASC'
  //   ? await VehicleModel.find({}).sort({ _id: 1 })
  //   : await VehicleModel.find({})
  return await vehicleEntryModel.find().populate({
    path: 'vehicleId',
    select: 'vehicleMake vehicleNo vehicleModel vehicleType customer -_id',
  })
}

const doCheckIn = async (entry: IVehicleEntryDTO) => {
  // If vehicle Exists, then create just VehicleEntry, else both Vehicle and VehicleEntry

  // entry.vehicleImagePath = files['vehicleImage'] && files['vehicleImage'][0].filename
  try {
    const createdVehicleEntry = await vehicleEntryModel.create(entry)
    return createdVehicleEntry
  } catch (error) {
    return new Error('could not add to database')
  }
}

const checkVehicleExists = async (number: string) => {
  const doc = await VehicleModel.findOne({ vehicleNo: number })
  return doc
}

const filterVehicleEntries = (data: IVehicleEntry[], { page, count, vehicleEntry, purpose }: any) => {
  const p = page && parseInt(page)
  const c = count && parseInt(count)
  const skip = (p as number) * (c as number)
  let ans = data.slice(skip, skip + (c as number))

  if (!isEmpty(vehicleEntry)) {
    ans = ans.filter((el: any) => el.name.toLowerCase().startsWith(vehicleEntry!.toLowerCase()))
  }
  if (!isEmpty(purpose)) {
    ans = ans.filter((el: any) => el.purpose === purpose)
  }
  return ans
}

const getFilteredVehicleEntries = async (queries?: IFilterQueries) => {
  if (queries) {
    const { page, count, vehicleEntry, purpose } = queries
    const data = await fetchAll()
    return {
      totalCount: data.length,
      data: filterVehicleEntries(data, { page, count, vehicleEntry, purpose }),
    }
  }
}

const getAllVehicleEntries = async () => {
  const datas = await fetchAll()

  const data = datas.map(item => {
    const { _id, vehicleId, intime, purpose, remark, createdAt, updatedAt } = item
    if (vehicleId) {
      const { vehicleMake, vehicleModel, vehicleType, vehicleNo, customer } = vehicleId
      const { customerName, customerAddress, customerMobile } = customer
      return {
        _id,
        vehicleMake,
        vehicleModel,
        vehicleType,
        vehicleNo,
        customerName,
        customerMobile,
        customerAddress,
        purpose,
        intime,
        remark,
        createdAt,
        updatedAt,
      }
    } else return { _id, purpose, intime, remark }
  })

  return {
    totalCount: data.length,
    data,
  }
}

export { doCheckIn, checkVehicleExists, getFilteredVehicleEntries, getAllVehicleEntries }
