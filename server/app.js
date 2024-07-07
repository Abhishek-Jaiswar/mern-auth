import userRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

import express from 'express'

const app = express()

// set json parser middleware
app.use(express.json())
app.use(cookieParser())

// router setup

app.use('/api/users', userRoute)


export default app