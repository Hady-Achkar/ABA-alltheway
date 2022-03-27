import {Router} from 'express'
import {CreateUser, EditUser, Signin} from '../controllers'
import {VerifyAuth} from '../middlewares'

const router = Router()

router.route('/signup').post(CreateUser)
router.route('/signin').post(Signin)
router.route('/edit').put(VerifyAuth, EditUser)

export default router
