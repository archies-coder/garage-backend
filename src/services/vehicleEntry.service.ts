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

const fetchAll = async (order: string) => {
  return order === 'DESC'
    ? await VehicleModel.find({}).sort({ _id: -1 })
    : order === 'ASC'
    ? await VehicleModel.find({}).sort({ _id: 1 })
    : await VehicleModel.find({})
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

const getFilteredVehicleEntries = async (queries?: IFilterQueries) => {
  if (queries) {
    const { page, count, vehicleEntry, purpose } = queries
    const data = await fetchAll('DESC')
    const filter = (data: IVehicle[]) => {
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
    return {
      totalCount: data.length,
      data: filter(data),
    }
  }
}

export { doCheckIn, checkVehicleExists, getFilteredVehicleEntries }
