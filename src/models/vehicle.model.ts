import { Document, Model, model, Schema } from 'mongoose'

export interface IVehicle extends Document {
  vehicleNo: string
  vehicleModel: string
  vehicleMake: string
  vehicleType: string
  vehicleImagePath: string
  customerName: string
  customerMobile: string
}

const vehicleSchema: Schema = new Schema(
  {
    vehicleNo: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
    },
    vehicleMake: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    vehicleImagePath: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerMobile: {
      type: String,
    },
  },
  { timestamps: true },
)

const VehicleModel: Model<IVehicle> = model<IVehicle>('Vehicle', vehicleSchema)

export default VehicleModel
