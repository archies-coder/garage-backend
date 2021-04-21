import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'
import { ILoginDTO, IRegisterDTO } from './../dtos/auth.dtos'
import bcrypt from 'bcrypt'
import HttpException from '../exceptions/HttpException'

async function login(params: ILoginDTO) {
  const user = await userModel.findOne({ username: params.username })
  if (!user) {
    return new HttpException('Invalid Credentials', 401)
  }
  const valid = await bcrypt.compare(params.password, user.password)
  if (!valid) {
    return new HttpException('Invalid Credentials', 401)
  }
  const { password, ...rest } = user
  const token = jwt.sign(
    {
      data: rest,
    },
    'secret',
    { expiresIn: '7d' },
  )
  return token
}

async function createUser(params: IRegisterDTO) {
  const exists = await userModel.findOne({ username: params.username })
  if (exists) {
    return new HttpException('Username Already Taken', 409)
  }
  const hashedPw = await bcrypt.hash(params.password, 12)
  const user = await userModel.create({
    ...params,
    password: hashedPw,
  })
  return user
}

export { login, createUser }
