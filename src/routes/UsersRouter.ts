import {Router} from 'express'
import {CreateUser, EditUser, Signin, GetUser} from '../controllers'
import {VerifyAuth} from '../middlewares'

const router = Router()

router.route('/signup').post(CreateUser)
router.route('/signin').post(Signin)
router.route('/').put(VerifyAuth, EditUser)
router.route('/').get(VerifyAuth, GetUser)

export default router
