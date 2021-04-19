import { Model, model, Schema, Document } from 'mongoose'

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

interface IVehicleEntryModel extends Document {
  vehicleImagePath: string
  customerName: string
  customerMobile: string
  purpose: string
  remark: string
  vehicleEntryCount: string
  vehicleNo: string
  vehicleModel: string
  vehicleType: string
  checkOutBy: string
  intime: string
  outime: string
}

const vehicleEntryModel: Model<IVehicleEntryModel> = model('VehicleEntry', vehicleEntrySchema)

export default vehicleEntryModel
