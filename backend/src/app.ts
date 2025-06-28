import express, { Request, Response } from 'express'
import logger from 'morgan'
import cors from 'cors'
import { customerRouter } from './app/customer/router/customerRouter'

export const app = express()

// Middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the api style service manager' })
})
app.use('/api/customers', customerRouter)
