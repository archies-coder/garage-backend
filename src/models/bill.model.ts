import { Model, model } from 'mongoose'
import { Document, Schema } from 'mongoose'
import { IVehicleEntry } from './vehicleEntry.model'

export interface IBill extends Document {
  name: string
  cost: number
  vehicleEntryId: IVehicleEntry['_id']
  createdAt?: string
  updatedAt?: string
}

export const BillSchema: Schema<IBill> = new Schema(
  {
    vehicleEntryId: {
      type: Schema.Types.ObjectId,
      ref: 'VehicleEntry',
      required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    sparePartsInfo: [{ type: Schema.Types.ObjectId, ref: 'SparePart' }],
  },
  { timestamps: true },
)

const billModel: Model<IBill> = model('Bill', BillSchema)

export default billModel
