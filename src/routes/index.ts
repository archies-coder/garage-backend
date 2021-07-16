import { Router } from 'express'
import VehicleEntryRoutes from './vehicleEntry.routes'
import VehicleRoutes from './vehicle.routes'
import BillRoutes from './bill.routes'
import AuthRoutes from './auth.routes'
import StatsRoutes from './stats.routes'
import CustomerRoutes from './customer.routes'
import SparePartRoutes from './sparePart.routes'

const BASE_URL = '/garage/v1.0'

export default () => {
  const router = Router()

  router.use(BASE_URL, [
    VehicleEntryRoutes,
    VehicleRoutes,
    BillRoutes,
    AuthRoutes,
    StatsRoutes,
    CustomerRoutes,
    SparePartRoutes,
  ])

  return router
}
