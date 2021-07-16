import { Router } from 'express'
import { doLogin, doRegister } from '../controllers/auth.controller'

const router: Router = Router()

router.post('/login', doLogin)
router.post('/register', doRegister)

export default router
