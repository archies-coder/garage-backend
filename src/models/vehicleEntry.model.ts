import { Model, model, Schema } from 'mongoose'

const vehicleEntrySchema = new Schema({
  vehicleImagePath: {
    type: String,
  },
  customerName: {
    type: String,
  },
  customerMobile: {
    type: String,
  },
  purpose: {
    type: String,
  },
  remark: {
    type: String,
  },
  vehicleEntryCount: {
    type: String,
  },
  vehicleNo: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  checkOutBy: {
    type: String,
  },
  intime: {
    type: String,
  },
  outime: {
    type: String,
  },
})

const vehicleEntryModel: Model<any> = model('VehicleEntry', vehicleEntrySchema)

export default vehicleEntryModel
