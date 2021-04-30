import { Document, Model, model, Schema } from 'mongoose'

export interface ICustomer extends Document {
  customerName: string
  customerMobile: string
  customerAddress: string
}

export const customerSchema: Schema<ICustomer> = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerMobile: {
    type: Number,
  },
  customerAddress: {
    type: String,
  },
})

export interface IVehicle extends Document {
  vehicleNo: string
  vehicleModel: string
  vehicleMake: string
  vehicleType: string
  vehicleImagePath?: string
  customer: {
    customerName: ICustomer['customerName']
    customerMobile: ICustomer['customerMobile']
    customerAddress: ICustomer['customerAddress']
  }
}

const vehicleSchema: Schema<IVehicle> = new Schema(
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
    customer: {
      type: customerSchema,
    },
  },
  { timestamps: true },
)

const VehicleModel: Model<IVehicle> = model<IVehicle>('Vehicle', vehicleSchema)

export default VehicleModel
