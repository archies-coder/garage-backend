import { NextFunction, Request, Response } from 'express'
import { INewBillDTO } from '../dtos/bill.dtos'
import { createBillAndUpdateVehicleEntry, fetchAllBills, fetchBillByID } from '../services/bill.service'

const getAllBills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await fetchAllBills()
    res.send({
      totalCount: data.length,
      data: data,
    })
  } catch (error) {}
}

const getBillByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    if (id) {
      const data = await fetchBillByID(id)
      res.send({ data })
    } else {
      next('No ID provided')
    }
  } catch (error) {
    next(error)
  }
}

const createNewBill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBillInput: INewBillDTO = req.body
    if (!newBillInput) return res.status(422).send('No Requst Body')
    const newBill = await createBillAndUpdateVehicleEntry(newBillInput)
    res.send({ data: newBill, message: 'Successfully created' })
  } catch (error) {
    next(error)
  }
}

export { getAllBills, getBillByID, createNewBill }
