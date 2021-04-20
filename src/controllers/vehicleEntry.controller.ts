import { Request, Response } from 'express'
import vehicleEntryModel from '../models/vehicleEntry.model'
import { createNewVehicle } from '../services/vehicle.service'
import { checkVehicleExists, doCheckIn, getFilteredVehicleEntries } from '../services/vehicleEntry.service'
import { IVehicleDTO } from './../dtos/vehicle.dtos'
import { IVehicleEntryDTO } from './../dtos/vehicleEntry.dtos'
import { IVehicle } from './../models/vehicle.model'

export = {
  checkIn: async (req: Request, res: Response) => {
    const vehicleEntry: IVehicleEntryDTO & IVehicleDTO = req.body
    if (vehicleEntry) {
      const { vehicleNo, vehicleImagePath, vehicleMake, vehicleModel, vehicleType, purpose, remark, intime } = vehicleEntry
      // Check if Vehicle already Exists
      const existingVehicle = await checkVehicleExists(vehicleNo)
      if (existingVehicle) {
        try {
          const createdVehicleEntry = await doCheckIn({
            vehicleId: existingVehicle._id,
            purpose,
            remark,
            intime,
          })
          if (createdVehicleEntry) return res.send(createdVehicleEntry)
        } catch (error) {
          res.status(401).send(error.message)
        }
      } else {
        const newVehicle: IVehicle = await createNewVehicle({
          vehicleNo,
          vehicleImagePath,
          vehicleMake,
          vehicleModel,
          vehicleType,
        })
        const vehicleId = newVehicle._id
        const createdVehicleEntry = await doCheckIn({ vehicleId, purpose, remark, intime })
        return res.send(createdVehicleEntry)
      }
    } else {
      throw new Error('No Request Body')
    }
  },

  getVehicleEntrys: async (req: Request, res: Response) => {
    let ans: any
    if (Object.keys(req.query).length > 0) {
      ans = await getFilteredVehicleEntries(req.query)
    } else {
      ans = await getFilteredVehicleEntries()
    }
    res.send({
      totalCount: ans.totalCount,
      data: ans.data,
    })
  },

  checkOut: async (req: any, res: any) => {
    const { checkin_id, user } = req.body
    const update = { checkOutBy: user, outime: new Date().toISOString() }

    await vehicleEntryModel.findByIdAndUpdate(checkin_id, update)
    res.send({ checkOut: 'Success' })
  },

  getPurpose: async (req: any, res: any) => {
    const vehicleEntryPurpose = await vehicleEntryModel.distinct('purpose')
    const purposeArr = [...vehicleEntryPurpose].flat()
    res.send({ data: purposeArr, totalCount: purposeArr.length })
  },
}
