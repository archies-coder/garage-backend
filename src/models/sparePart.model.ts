import { Document, Model, model, Schema } from 'mongoose'

export interface ISparePart extends Document {
  name: string
  quantity: number
}

const sparePartSchema: Schema<ISparePart> = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
})

const SparePartModel: Model<ISparePart> = model<ISparePart>('SparePart', sparePartSchema)

export default SparePartModel
