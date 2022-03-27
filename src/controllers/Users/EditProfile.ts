import {Request, Response} from 'express'
import {UsersSchema} from '../../models'
import * as bcrypt from 'bcryptjs'

export default async (req: Request, res: Response) => {
	//@ts-ignore
	const {_id: UserId} = req.user

	const {name, email, password} = req.body
	let userData = {}
	try {
		if (name && name !== '') {
			userData = {...userData, name}
		}
		if (email && email !== '') {
			userData = {...userData, email}
		}
		const _user = await UsersSchema.findById(UserId)

		if (!_user) {
			return res.status(404).json({message: 'User was not found.'})
		}

		const _updated = await UsersSchema.findByIdAndUpdate(UserId, userData)

		return res
			.status(200)
			.json({user: UserId, message: 'User was updated successfully.'})
	} catch (error) {
		return res.status(500).json({message: 'Internal server error'})
	}
}
