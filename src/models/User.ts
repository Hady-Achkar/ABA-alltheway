import {model, Schema} from 'mongoose'
import * as bcrypt from 'bcryptjs'

interface IUser {
	name: string
	email: string
	password: string
}

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
UserSchema.pre('save', async function (next) {
	this.name = this.name.toUpperCase()
	this.email = this.email.toLowerCase()
	if (this.isNew) {
		this.password = await bcrypt.hash(this.password, 10)
	}
	next()
})
export default model<IUser>('User', UserSchema)
