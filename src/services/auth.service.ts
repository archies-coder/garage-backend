import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'
import { ILoginDTO, IRegisterDTO } from './../dtos/auth.dtos'
import bcrypt from 'bcrypt'
import HttpException from '../exceptions/HttpException'
import { HttpErrorCodes } from '../enums/statusCodes.enum'

async function login(params: ILoginDTO) {
  const user = await userModel.findOne({ username: params.username })
  if (!user) {
    throw new HttpException('Invalid Credentials', HttpErrorCodes.Unauthorized)
  }
  const valid = await bcrypt.compare(params.password, user.password)
  if (!valid) {
    throw new HttpException('Invalid Credentials', HttpErrorCodes.Unauthorized)
  }
  const { password, ...rest } = user
  const token = jwt.sign(
    {
      data: rest,
    },
    'secret',
    { expiresIn: '7d' },
  )
  return { token, userType: user.usertype, username: user.username }
}

async function createUser(params: IRegisterDTO) {
  const exists = await userModel.findOne({ username: params.username })
  if (exists) {
    throw new HttpException('Username Already Taken', HttpErrorCodes.Conflict)
  }
  const hashedPw = await bcrypt.hash(params.password, 12)
  const user = await userModel.create({
    ...params,
    password: hashedPw,
  })
  return user
}

export { login, createUser }
