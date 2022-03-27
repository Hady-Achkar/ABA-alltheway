import express from 'express'
import {MongoConnect} from './lib'
import cors from 'cors'
import {UsersRouter} from './routes'

const app = express()
const port = 5000

MongoConnect()

app.use(express.json())
app.use(cors())

app.use('/user', UsersRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
