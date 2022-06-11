import { USERNAME_ALREADY_TAKEN } from './../common/consts/errors'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'
import { ILoginDTO, IRegisterDTO } from './../dtos/auth.dtos'
import bcrypt from 'bcrypt'
import HttpException from '../exceptions/HttpException'
import { HttpErrorCodes } from '../enums/statusCodes.enum'

const withoutPassword = (user: { username: string; password?: string }) => {
  delete user.password
  return user
}

async function login({ username, password: userPassword }: ILoginDTO) {
  const user = await userModel.findOne({ username: username })
  if (!user) {
    throw new HttpException('Invalid Credentials', HttpErrorCodes.Unauthorized)
  }
  const valid = await bcrypt.compare(userPassword, user.password)
  if (!valid) {
    throw new HttpException('Invalid Credentials', HttpErrorCodes.Unauthorized)
  }
  const token = jwt.sign(
    {
      data: withoutPassword(user),
    },
    'secret',
    { expiresIn: '7d' },
  )
  return { token, userType: user.usertype, username: user.username }
}

async function createUser({ username, password }: IRegisterDTO) {
  const exists = await userModel.findOne({ username })
  if (exists) {
    return new HttpException(USERNAME_ALREADY_TAKEN, 409)
  }
  const hashedPw = await bcrypt.hash(password, 12)
  const user = await userModel.create({
    username,
    password: hashedPw,
  })
  return user
}

export { login, createUser }
