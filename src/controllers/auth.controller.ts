import { ILoginDTO, IRegisterDTO } from './../dtos/auth.dtos'
import { Request, Response } from 'express'
import { createUser, login } from '../services/auth.service'

const doLogin = async (req: Request, res: Response) => {
  const loginInput: ILoginDTO = req.body
  console.log(loginInput)
  try {
    const data = await login(loginInput)
    res.send({
      ...data,
    })
  } catch (error) {
    console.log(error)
    return res.status(error.status).send(error)
  }
}

const doRegister = async (req: Request, res: Response) => {
  const registerInput: IRegisterDTO = req.body
  if (!registerInput) return res.status(422).send('No Requst Body')
  try {
    const user = await createUser(registerInput)
    res.send({
      data: user,
    })
  } catch (error) {
    return res.status(error.status).send(error)
  }
}

export { doLogin, doRegister }