import { NextFunction, Request, Response } from 'express'
import { IVehicleDTO } from '../dtos/vehicle.dtos'
import { createNewVehicle, getVehicle } from '../services/vehicle.service'

const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
  const vehicles = await getVehicle()
  res.send({
    totalCount: vehicles.length,
    data: vehicles ? vehicles : [],
  })
}

const postVehicle = async (req: Request, res: Response) => {
  const vehicleInput: IVehicleDTO = req.body
  if (!vehicleInput) return res.status(422).send('No Requst Body')
  try {
    // TODO check if already exists, send 409 (CONFLICT) if so
    const vehicle = await createNewVehicle(vehicleInput)
    res.send({
      data: vehicle,
    })
  } catch (error) {
    return res.status(error.status).send(error)
  }
}

const getVehicleImage = async (req: Request, res: Response) => {
  // const id: string = req.params.id
  // const response = await axios.get(
  //   'https://storage.googleapis.com/garage-4b71d.appspot.com/passportpic.jpg_1621015334284',
  // )
  // debugger
  // const filename = ''
  // try {
  //   response[0].map(item => {
  //     debugger
  //     filename = item.name
  //     const file = item.download({ destination: './../../uploads/file.jpg' })
  //   })
  // } catch (error) {
  //   console.error('Something went wrong\n' + error)
  // }
  // res.sendFile(path.join(__dirname, '../../uploads/', filename))
}

export { getVehicles, postVehicle, getVehicleImage }
