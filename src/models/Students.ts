import {Schema, model, Document} from 'mongoose'
interface IStudent extends Document {
	name: string
	dateOfBirth: Date
	programs: any[]
	phone: string
	therapist: any
}
const StudentSchema = new Schema<IStudent>(
	{
		name: {type: String, required: true, trim: true},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		therapist: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		programs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Programs',
			},
		],
	},
	{
		timestamps: true,
	}
)
export default model<IStudent>('Students', StudentSchema)
