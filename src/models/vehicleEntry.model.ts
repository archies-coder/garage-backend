import { IVehicle } from './vehicle.model'
import { Document, Model, model, Schema } from 'mongoose'

export interface IVehicleEntry extends Document {
  purpose: string
  remark: string
  vehicleEntryCount: string
  checkOutBy: string
  intime: string
  outime: string
  vehicleId: IVehicle['_id']
}

const vehicleEntrySchema: Schema = new Schema(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
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
    checkOutBy: {
      type: String,
    },
    intime: {
      type: String,
    },
    outime: {
      type: String,
    },
  },
  { timestamps: true },
)

const vehicleEntryModel: Model<any> = model('VehicleEntry', vehicleEntrySchema)

export default vehicleEntryModel
