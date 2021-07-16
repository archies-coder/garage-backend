import { NextFunction, Request, Response } from 'express'
import { HttpErrorCodes } from '../enums/statusCodes.enum'
import { createUser, login } from '../services/auth.service'
import { ILoginDTO, IRegisterDTO } from './../dtos/auth.dtos'

const doLogin = async (req: Request, res: Response, next: NextFunction) => {
  const loginInput: ILoginDTO = req.body
  try {
    const data = await login(loginInput)
    res.send({
      ...data,
    })
  } catch (error) {
    next(error)
    // return res.status(error.status).send(error)
  }
}

const doRegister = async (req: Request, res: Response, next: NextFunction) => {
  const registerInput: IRegisterDTO = req.body
  if (!registerInput) return res.status(HttpErrorCodes.BadRequest).send('No Requst Body')
  try {
    const user = await createUser(registerInput)
    res.send({
      data: user,
    })
  } catch (error) {
    next(error)
    // return res.status(error.status).send(error)
  }
}

export { doLogin, doRegister }
