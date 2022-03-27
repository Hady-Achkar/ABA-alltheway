import {UsersSchema} from '../../models'
import {Request, Response} from 'express'

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

		return res
			.status(200)
			.json({user: newUser._id, message: 'User was created successfully'})
	} catch (error) {
		return res.status(500).json({message: 'Internal server error'})
	}
}
