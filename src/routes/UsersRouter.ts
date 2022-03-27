import {Router} from 'express'
import {CreateUser} from '../controllers'

const router = Router()

router.route('/').post(CreateUser)

export default router
