import { baseUrl } from './../app'
import { Router } from 'express'
import { doLogin, doRegister } from '../controllers/auth.controller'

const router: Router = Router()

router.post(`/garage/v1.0/login`, doLogin)
router.post('/garage/v1.0/register', doRegister)

export default router
