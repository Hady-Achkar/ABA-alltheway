import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import {UsersSchema} from '../../models'

export default async (req: Request, res: Response) => {
	try {
		const {email, password} = req.body
		if (!email || email === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing email',
						field: 'email',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!password || password === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing password',
						field: 'password',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		const _user = await UsersSchema.findOne({
			email,
		})
		if (!_user) {
			return res.status(404).json({
				status: 'Failure',
				message: 'Email was not found',
				requestTime: new Date().toISOString(),
			})
		} else {
			const _verifyLogin = await bcrypt.compare(password, _user.password)
			if (!_verifyLogin) {
				return res.status(401).json({
					status: 'Failure',
					message: 'Wrong credentials',
					requestTime: new Date().toISOString(),
				})
			}
			const payload = {
				email: _user.email,
				name: _user.name,
				_id: _user._id,
			}
			jwt.sign(
				payload,
				'123456',
				{
					expiresIn: '48h',
				},
				async (_, encoded) => {
					console.log(`Access Token generated for User : ${email}`)
					return res.status(200).json({
						status: 'success',
						message: 'user was logged in successfully.',
						token: encoded,
						name: _user.name,
						email: _user.email,
						_id: _user._id,
						requestTime: new Date().toISOString(),
					})
				}
			)
		}
	} catch (err) {
		if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
}
