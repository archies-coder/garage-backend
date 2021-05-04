import vehicleEntryModel from '../models/vehicleEntry.model'
import { subDays, addDays } from 'date-fns'

interface IStat {
  delivered: number
  in_garage: number
  parts_used: number
  total_customers: number
  vehicleEntriestats: number[]
}

const fetchAll = async (date?: any) => {
  const referenceDate = date ? new Date(date) : new Date()
  const startOfDate = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  )
  const days = [
    new Date(subDays(new Date(), 0).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 1).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 2).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 3).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 4).setUTCHours(0, 0, 0, 0)).toISOString(),
  ]
  const vehicleEntriesByDay: number[] = []
  days.map(async (element, i) => {
    vehicleEntriesByDay[i] =
      (await vehicleEntryModel.countDocuments({
        createdAt: {
          $gte: element,
          $lt: addDays(new Date(element), 1).toISOString(),
        },
      })) || 0
  })

  const data: IStat = {
    delivered: 0,
    in_garage: 0,
    parts_used: 0,
    total_customers: 0,
    vehicleEntriestats: [0, 0, 0, 0, 0],
  }
  data.delivered =
    (await vehicleEntryModel.countDocuments({
      outime: { $gte: startOfDate.toISOString() },
    })) || 0
  data.in_garage =
    (await vehicleEntryModel.countDocuments({
      $and: [{ createdAt: { $gte: startOfDate.toISOString() } }, { outime: '' }],
    })) || 0
  data.parts_used = 25
  data.total_customers =
    (await vehicleEntryModel.countDocuments({
      createdAt: { $gte: startOfDate.toISOString() },
    })) || 0
  data.vehicleEntriestats = vehicleEntriesByDay

  return data
}

export { fetchAll }
