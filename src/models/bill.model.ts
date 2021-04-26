import { Model, model } from 'mongoose'
import { Document, Schema } from 'mongoose'

export interface IBill extends Document {
  name: string
  cost: number
}

export const BillSchema: Schema<IBill> = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

const billModel: Model<IBill> = model('Bill', BillSchema)

export default billModel
