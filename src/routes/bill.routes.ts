import { Router } from 'express'
import {
  createNewBill,
  getAllBills,
  getAllBillsByVehicleEntryId,
  getBillByID,
} from '../controllers/bill.controller'

const router: Router = Router()

router.get('/bills', getAllBills)
router.get('/bill/:id', getBillByID)
router.post('/bill', createNewBill)
router.get('/bills_by_vehicle_entry/:vehicleEntryId', getAllBillsByVehicleEntryId)

export default router
