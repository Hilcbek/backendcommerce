import express from 'express'
import { AddProduct, AllProduct, GetCatagory, GetCatagoryByCatandColor, SingleProduct, getRandomData } from '../controllers/product.controller.js'
import { verifyIsUserAdmin, verifyUserILoggedInForBackend } from '../Token/token.js'
export let productRouter = express.Router()
productRouter.post('/add',AddProduct)
productRouter.get('/single/:id',SingleProduct)
productRouter.get('/',AllProduct)
productRouter.get('/random',getRandomData)
productRouter.get('/catagory/:cat',GetCatagory)
productRouter.get('/catagory/bothcat/pro',GetCatagoryByCatandColor)