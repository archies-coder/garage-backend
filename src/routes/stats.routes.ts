import { Router } from 'express'
import { getStatsData } from '../controllers/stats.controller'

const router: Router = Router()

router.get('/stats-data', getStatsData)

export default router
