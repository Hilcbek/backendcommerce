import express from 'express'
import { Payment } from '../controllers/stripe.controller.js'
import { verifyUserILoggedInForBackend } from '../Token/token.js'
export let paymentRouter = express.Router()
paymentRouter.post('/',Payment)
//verifyUserILoggedInForBackend