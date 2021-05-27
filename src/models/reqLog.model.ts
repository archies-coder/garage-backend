import { HTTPMethods } from './../enums/methods.enum'
import { Document, Model, model, Schema } from 'mongoose'

export interface IReqLog extends Document {
  ip: string
  resource: string
  method: HTTPMethods
}

export const ReqLogSchema: Schema<IReqLog> = new Schema(
  {
    ip: {
      type: String,
    },
    resource: {
      type: String,
    },
    method: {
      type: String,
    },
  },
  { timestamps: true },
)

const reqLogModel: Model<IReqLog> = model('Request_Log', ReqLogSchema)

export default reqLogModel
