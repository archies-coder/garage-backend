import { Router } from 'express'
import { getAllCustomers } from '../controllers/customer.controller'

const router: Router = Router()

router.get('/garage/v1.0/customers', getAllCustomers)

export default router
