import {Router} from 'express'
import {CreateUser, Signin} from '../controllers'

const router = Router()

router.route('/signup').post(CreateUser)
router.route('/signin').post(Signin)

export default router
