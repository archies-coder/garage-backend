import { NextFunction, Request, Response } from 'express'
import { createNewSparePart, fetchAll } from '../services/sparePart.service'
import { ISparePartDTO } from '../dtos/sparePart.dtos'

const getSpareParts = async (req: Request, res: Response, next: NextFunction) => {
  const spareParts = await fetchAll()
  res.send({
    data: spareParts,
    message: 'All spare-parts',
  })
}

const postSparePart = async (req: Request, res: Response) => {
  const sparePartInput: ISparePartDTO = req.body
  if (!sparePartInput) return res.status(422).send('No Requst Body')
  try {
    // TODO check if already exists, send 409 (CONFLICT) if so
    const sparePart = await createNewSparePart(sparePartInput)
    res.send({
      data: sparePart,
    })
  } catch (error) {
    return res.status(error.status).send(error)
  }
}

export { getSpareParts, postSparePart }
