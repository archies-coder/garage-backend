import { Document, Model, model, Schema } from 'mongoose'

export interface ISparePart extends Document {
  name: string
  category: string
  brand: string
  quantity: number
}

const sparePartSchema: Schema<ISparePart> = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  quantity: {
    type: Number,
  },
})

const SparePartModel: Model<ISparePart> = model<ISparePart>('SparePart', sparePartSchema)

export default SparePartModel
