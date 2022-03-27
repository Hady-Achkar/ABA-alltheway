import {Schema, model, Document} from 'mongoose'

interface IProgram extends Document {
	title: string
	targets: any[]
}

const ProgramSchema = new Schema<IProgram>(
	{
		title: {type: String, required: true, trim: true},
		targets: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Targets',
			},
		],
	},
	{
		timestamps: true,
	}
)

export default model<IProgram>('Programs', ProgramSchema)
