import {Request, Response} from 'express'
import {UsersSchema} from '../../models'

export default async (req: Request, res: Response) => {
	//@ts-ignore
	const {_id: UserId} = req.user

	try {
		if (!UserId) {
			return res.status(404).json({message: 'User was not found'})
		}
		const _user = await UsersSchema.findById(UserId).select('-password')
		res
			.status(200)
			.json({message: 'User was fetched successfully', data: _user})
	} catch (error) {
		return res.status(500).json({message: 'Internal server error'})
	}
}
