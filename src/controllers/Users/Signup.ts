import {UsersSchema} from '../../models'
import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'

export default async (req: Request, res: Response) => {
	const {name, email, password} = req.body
	try {
		if (!name || name.length === 0) {
			return res.status(400).json({message: 'Missing name'})
		}

		if (!email || email.length === 0) {
			return res.status(400).json({message: 'Missing email'})
		}
		if (!password || password.length < 6) {
			return res.status(400).json({
				message: 'Missing password, password must be at least 6 characters',
			})
		}

		const newUser = await UsersSchema.create({name, email, password})

		const payload = {
			_id: newUser._id,
			email: newUser.email,
			name: newUser.name,
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
					status: 'Success',
					message: 'Admin account was created successfully.',
					token: encoded,
					name: newUser.name,
					email: newUser.email,
					_id: newUser._id,
					requestTime: new Date().toISOString(),
				})
			}
		)
	} catch (error) {
		return res.status(500).json({message: 'Internal server error'})
	}
}
