import { NextFunction, Request, Response } from 'express'
import { fetchCustomer } from '../services/customer.service'

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await fetchCustomer()
    res.send({
      totalCount: data.length,
      data: data,
    })
  } catch (error) {}
}

export { getAllCustomers }
