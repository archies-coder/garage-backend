import { DATABASE_ERRORS } from './../common/consts/errors'
import * as uuid from 'uuid'
import HttpException from '../exceptions/HttpException'
import { uploadImageToStorage } from '../middlewares/imageUpload.middleware'
import VehicleModel from '../models/vehicle.model'
import vehicleEntryModel from '../models/vehicleEntry.model'
import isEmpty from '../utils/isEmpty'
import { IVehicleEntryDTO } from './../dtos/vehicleEntry.dtos'
import { IVehicleEntry } from './../models/vehicleEntry.model'

interface IFilterQueries {
  page?: string
  count?: string
  vehicleEntry?: string
  purpose?: string
}

const fetchAll = async () => {
  return await vehicleEntryModel.find().populate({
    path: 'vehicleId',
    select:
      'vehicleMake vehicleImagePath vehicleNo vehicleModel vehicleType customer -_id',
  })
}

const getPurposes = async () => {
  const resp = await vehicleEntryModel.distinct('purpose')
  return resp
}

const doCheckIn = async (entry: IVehicleEntryDTO) => {
  // If vehicle Exists, then create just VehicleEntry, else both Vehicle and VehicleEntry

  // entry.vehicleImagePath = files['vehicleImage'] && files['vehicleImage'][0].filename
  try {
    const createdVehicleEntry = await vehicleEntryModel.create(entry)
    return createdVehicleEntry
  } catch (error) {
    return new Error(DATABASE_ERRORS.ADD_FAILED)
  }
}

const checkVehicleExists = async (number: string) => {
  const doc = await VehicleModel.findOne({ vehicleNo: number })
  return doc
}

const filterVehicleEntries = (
  data: IVehicleEntry[],
  { page, count, vehicleEntry, purpose }: any,
) => {
  const p = page && parseInt(page)
  const c = count && parseInt(count)
  const skip = (p as number) * (c as number)
  let ans = data.slice(skip, skip + (c as number))

  if (!isEmpty(vehicleEntry)) {
    ans = ans.filter((el: any) =>
      el.name.toLowerCase().startsWith(vehicleEntry!.toLowerCase()),
    )
  }
  if (!isEmpty(purpose)) {
    ans = ans.filter((el: any) => el.purpose === purpose)
  }
  return ans
}

const getFilteredVehicleEntries = async (queries: IFilterQueries) => {
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
  const data = await fetchAll()

  const resp = data.map(item => {
    const { _id, vehicleId, intime, purpose, remark, createdAt, updatedAt, outime } = item
    if (vehicleId) {
      const {
        vehicleMake,
        vehicleModel,
        vehicleType,
        vehicleNo,
        customer,
        vehicleImagePath,
      } = vehicleId
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
        outime,
        vehicleImagePath,
      }
    } else return { _id, purpose, intime, remark }
  })

  return {
    totalCount: resp.length,
    data: resp,
  }
}

const uploadVehicleImage = async (file: File | any) => {
  try {
    if (file) {
      const id = uuid.v4()
      const imageUploadResponse: { url: string; id: string } = await uploadImageToStorage(
        file,
        id,
      )
      if (imageUploadResponse) return imageUploadResponse
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const doCheckOut = async (id: string) => {
  const vehicleEntryWithId = await vehicleEntryModel.findByIdAndUpdate(id, {
    outime: new Date().toISOString(),
  })
  if (!vehicleEntryWithId) return new HttpException('Vehicle not found', 404)
  return vehicleEntryWithId
}

export {
  doCheckIn,
  checkVehicleExists,
  getFilteredVehicleEntries,
  getAllVehicleEntries,
  uploadVehicleImage,
  doCheckOut,
  getPurposes,
}
