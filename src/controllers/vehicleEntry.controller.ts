import vehicleEntryModel from '../models/vehicleEntry.model'
import isEmpty = require('../utils/isEmpty')

module.exports = {
  checkIn: (req: any, res: any) => {
    const vehicleEntry = req.body
    vehicleEntry.vehicleImagePath = req.files['vehicleImage'] && req.files['vehicleImage'][0].filename
    console.log(vehicleEntry)
    const createdVehicleEntry = vehicleEntryModel.create(vehicleEntry)
    return res.send(createdVehicleEntry)
  },
  getVehicleEntrys: async (req: any, res: any) => {
    const { page, count, vehicleEntry, purpose } = req.query
    const data = await vehicleEntryModel.find({}).sort({ _id: -1 })
    const filter = (data: any) => {
      const p = parseInt(page)
      const c = parseInt(count)
      const skip = p * c
      let ans = data.slice(skip, skip + c)

      if (!isEmpty(vehicleEntry)) {
        ans = ans.filter((el: any) => el.name.toLowerCase().startsWith(vehicleEntry.toLowerCase()))
      }
      if (!isEmpty(purpose)) {
        ans = ans.filter((el: any) => el.purpose === purpose)
      }
      return ans
    }
    const filteredData = filter(data)
    res.send({
      totalCount: data.length,
      data: filteredData,
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
