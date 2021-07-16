import { Router } from 'express'
import { getAllCustomers } from '../controllers/customer.controller'

const router: Router = Router()

router.get('/customers', getAllCustomers)

export default router
