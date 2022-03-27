import {Schema, model, Document} from 'mongoose'
interface ITarget extends Document {
	title: string
	data: [
		{
			percentage: number
			date: Date
		}
	]
	isCompleted: boolean
}
const TargetSchema = new Schema<ITarget>(
	{
		title: {type: String, required: true, trim: true},
		data: [
			{
				percentage: {type: Number, required: true},
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
		isCompleted: {type: Boolean, default: false},
	},
	{
		timestamps: true,
	}
)
export default model<ITarget>('Targets', TargetSchema)
