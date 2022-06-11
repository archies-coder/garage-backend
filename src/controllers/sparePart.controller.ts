import { NextFunction, Request, Response } from 'express'
import { createOrUpdateSparePart, fetchAll } from '../services/sparePart.service'
import { ISparePartDTO } from '../dtos/sparePart.dtos'

const getSpareParts = async (req: Request, res: Response, next: NextFunction) => {
  const spareParts = await fetchAll()
  res.send({
    totalCount: spareParts.length,
    data: spareParts,
  })
}

const postSparePart = async (req: Request, res: Response) => {
  const sparePartInput: ISparePartDTO = req.body
  if (!sparePartInput) return res.status(422).send('No Requst Body')
  try {
    // TODO check if already exists, if so, update existing
    const sparePart = await createOrUpdateSparePart(sparePartInput)
    res.send({
      data: sparePart,
    })
  } catch (error) {
    return res.status(error.status).send(error)
  }
}

export { getSpareParts, postSparePart }
