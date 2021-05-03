import vehicleEntryModel from '../models/vehicleEntry.model'
import { subDays, addDays } from 'date-fns'

const fetchAll = async () => {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const days = [
    new Date(subDays(new Date(), 0).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 1).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 2).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 3).setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(subDays(new Date(), 4).setUTCHours(0, 0, 0, 0)).toISOString(),
  ]
  const visitorsByDay: any = []
  days.map(async (element, i) => {
    visitorsByDay[i] = await vehicleEntryModel.countDocuments({
      createdAt: {
        $gte: element,
        $lt: addDays(new Date(element), 1).toISOString(),
      },
    })
  })

  const data: any = {}
  data.delivered = (await vehicleEntryModel.countDocuments({ outime: { $gte: startOfToday.toISOString() } })) || 0
  data.in_garage =
    (await vehicleEntryModel.countDocuments({ $and: [{ createdAt: { $gte: startOfToday.toISOString() } }, { outime: '' }] })) || 0
  data.parts_used = 25
  data.total_customers = (await vehicleEntryModel.countDocuments({ createdAt: { $gte: startOfToday.toISOString() } })) || 0
  data.visitorStats = visitorsByDay

  return data
}

export { fetchAll }
