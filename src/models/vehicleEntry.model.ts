//import { BillSchema, IBill } from './bill.model'
import { IVehicle } from './vehicle.model'
import { Document, Model, model, Schema } from 'mongoose'

export interface IVehicleEntry extends Document {
  purpose: string
  remark: string
  intime: string
  outime: string
  vehicleId: IVehicle['_id']
  // billInfo: IBill['_id']
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
    intime: {
      type: String,
    },
    outime: {
      type: String,
    },
    // billInfo: [{ type: Schema.Types.ObjectId, ref: 'Bill' }],
  },
  { timestamps: true },
)

const vehicleEntryModel: Model<IVehicleEntry> = model('VehicleEntry', vehicleEntrySchema)

export default vehicleEntryModel
