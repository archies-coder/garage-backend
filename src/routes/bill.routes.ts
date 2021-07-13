import { Router } from 'express'
import {
  createNewBill,
  getAllBills,
  getAllBillsByVehicleEntryId,
  getBillByID,
} from '../controllers/bill.controller'

const router: Router = Router()

router.get('/garage/v1.0/bills', getAllBills)
router.get('/garage/v1.0/bill/:id', getBillByID)
router.post('/garage/v1.0/bill', createNewBill)
router.get(
  '/garage/v1.0/bills_by_vehicle_entry/:vehicleEntryId',
  getAllBillsByVehicleEntryId,
)

export default router
