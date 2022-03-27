import mongoose from 'mongoose'
export default () => {
	mongoose
		.connect(
			'mongodb+srv://hadialachkar:HadiAsh123@cluster0.pbqx8.mongodb.net/abaalltheway'
		)
		.then(() => {
			console.log('Connected to MongoDB')
		})
		.catch((err) => {
			console.error(err)
		})
	console.log('Connected to database successfully')
}
