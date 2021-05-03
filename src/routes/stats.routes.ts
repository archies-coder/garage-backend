import { Router } from 'express'
import { getStatsData } from '../controllers/stats.controller'

const router: Router = Router()

router.get(`/garage/v1.0/stats-data`, getStatsData)

export default router
