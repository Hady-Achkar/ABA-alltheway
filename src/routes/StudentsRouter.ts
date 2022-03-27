import {Router} from 'express'
import {CreateStudent} from '../controllers'
import {VerifyAuth} from '../middlewares'

const router = Router()

router.route('/').post(VerifyAuth, CreateStudent)

export default router
