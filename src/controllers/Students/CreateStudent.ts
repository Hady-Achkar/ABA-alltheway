import {Request, Response} from 'express'
import {StudentsSchema, UsersSchema} from '../../models'

//  name: string
// 	dateOfBirth: Date
// 	programs: any[]
// 	phone: string
// 	therapist: any

export default async (req: Request, res: Response) => {
	//@ts-ignore
	const {_id: UserId} = req.user
	const {name, dateOfBirth, phone} = req.body

	try {
		if (!name || name === '') {
			return res.status(400).json({message: 'Missing name'})
		}
		if (!dateOfBirth || dateOfBirth === '') {
			return res.status(400).json({message: 'Missing date of birth'})
		}
		if (!phone || phone.length < 7) {
			return res.status(400).json({message: 'Invalid phone number'})
		}
		const _therapist = await UsersSchema.findById(UserId)

		if (!_therapist) {
			return res.status(401).json({message: 'Unauthorized therapist'})
		}
		const _student = await StudentsSchema.create({
			name,
			dateOfBirth,
			phone,
			therapist: _therapist._id,
			programs: [],
		})

		return res.status(200).json({
			student: _student._id,
			message: 'Student was created successfully',
		})
	} catch (error) {
		if (error instanceof Error) {
			return res
				.status(500)
				.json({message: 'Error creating student', error: error})
		}
	}
}
