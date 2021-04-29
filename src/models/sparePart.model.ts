import { Document, Model, model, Schema } from 'mongoose'

export interface ISparePart extends Document {
  name: string
}

const sparePartSchema: Schema<ISparePart> = new Schema({
  name: {
    type: String,
    required: true,
  },
})

const SparePartModel: Model<ISparePart> = model<ISparePart>('SparePart', sparePartSchema)

export default SparePartModel
