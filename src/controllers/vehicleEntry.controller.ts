import { NextFunction, Request, Response } from 'express'
import vehicleEntryModel from '../models/vehicleEntry.model'
import { createNewVehicle } from '../services/vehicle.service'
import {
  checkVehicleExists,
  doCheckIn,
  getAllVehicleEntries,
  getFilteredVehicleEntries,
  getPurposes,
  uploadVehicleImage,
} from '../services/vehicleEntry.service'
import { IVehicleDTO } from './../dtos/vehicle.dtos'
import { IVehicleEntryDTO } from './../dtos/vehicleEntry.dtos'
import { IVehicle } from './../models/vehicle.model'

export = {
  checkIn: async (req: Request, res: Response, next: NextFunction) => {
    const vehicleEntry: IVehicleEntryDTO & IVehicleDTO = req.body

    if (vehicleEntry) {
      const {
        vehicleNo,
        vehicleMake,
        vehicleModel,
        vehicleType,
        purpose,
        remark,
        intime,
        customerName,
        customerMobile,
        customerAddress,
      } = vehicleEntry

      // Check if Vehicle already Exists
      try {
        const existingVehicle = await checkVehicleExists(vehicleNo)
        if (existingVehicle) {
          const createdVehicleEntry = await doCheckIn({
            vehicleId: existingVehicle._id,
            purpose,
            remark,
            intime,
            outime: '',
          })
          if (createdVehicleEntry) return res.send(createdVehicleEntry)
        } else {
          const uploadResponse = await uploadVehicleImage(req.file)

          let vehicleImagePath = ''
          if (uploadResponse) {
            vehicleImagePath = uploadResponse.url
          }
          const newVehicle: IVehicle = await createNewVehicle({
            vehicleNo,
            vehicleImagePath,
            vehicleMake,
            vehicleModel,
            vehicleType,
            customerName,
            customerMobile,
            customerAddress,
          })
          const vehicleId = newVehicle._id
          const createdVehicleEntry = await doCheckIn({
            vehicleId,
            purpose,
            remark,
            intime,
            outime: '',
          })
          return res.send(createdVehicleEntry)
        }
      } catch (error) {
        next(error)
      }
    } else {
      throw new Error('No Request Body')
    }
  },

  getVehicleEntries: async (req: Request, res: Response) => {
    let ans
    if (Object.keys(req.query).length > 0) {
      ans = await getFilteredVehicleEntries(req.query)
    } else {
      ans = await getAllVehicleEntries()
    }
    res.send({
      totalCount: ans ? ans.totalCount : 0,
      data: ans ? ans.data : [],
    })
  },

  checkOut: async (req: any, res: any) => {
    const checkin_id = req.params.id
    const update = {
      //  checkOutBy: user,
      outime: new Date().toISOString(),
    }

    await vehicleEntryModel.findByIdAndUpdate(checkin_id, update)
    res.send({ checkOut: 'Success' })
  },

  getPurpose: async (req: any, res: any) => {
    const vehicleEntryPurposeList = await getPurposes()
    res.send({
      data: vehicleEntryPurposeList,
      totalCount: vehicleEntryPurposeList.length,
    })
  },
}
