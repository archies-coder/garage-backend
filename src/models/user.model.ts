import { Model, model, Schema, Document } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
})

interface IUserModel extends Document {
  username: string
  password: string
  usertype?: string
  name: string
}

const userModel: Model<IUserModel> = model('User', userSchema)

export default userModel
