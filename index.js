//pk_test_51Mx5oOAdg8lcCCd4YNH531krGXEGRpUFLOBcBP7aljeRe6kWgRlX36rPmcG5Ch4yLfHXgHkoHuYpGIhsq1hCgT7800XPWBh2zz
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import helmet from 'helmet'
import { userRouter } from './routers/user.router.js'
import { productRouter } from './routers/product.router.js'
import { paymentRouter } from './routers/payment.router.js'
let app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(morgan('dev'))
app.use(cookieParser())
mongoose.connect(process.env.MONGODB).then(() => app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))).catch((err) => console.log(err))
mongoose.connection.on('connected', () => console.log('db connected again!'))
mongoose.connection.on('disconnected', () => console.log('db disconnected!'))
app.use('/api/auth',userRouter)
app.use('/api/product',productRouter)
app.use('/api/pay',paymentRouter)
app.use((err,req,res,next) => {
    let errorMessage = err.message || 'Something went wrong!'
    let errorStatus = err.status || 500
    res.status(errorStatus).json({ error : errorMessage })
})