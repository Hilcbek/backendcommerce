import { ErrorShower } from '../Error/error.js';
import Product from '../models/product.model.js'
import asyncHandler from 'express-async-handler'
export let AddProduct = asyncHandler(async (req,res,next) => {
    try {
        let {title, desc, img, catagories, size, color, price} = req.body;
        if(!title || !desc || !img || !catagories || !size || !color || !price) return next(ErrorShower(500, 'Enter All the information!'))
        let Title = await Product.findOne({ title : title })
        if(Title) return next(ErrorShower(500, 'product exist!'))
        let NewProduct = await Product.create(req.body)
        res.status(200).json({ data : NewProduct })
    } catch (error) {
        next(error)   
    }
})
export let SingleProduct = asyncHandler(async (req,res,next) => {
    try {
         let { id } = req.params;
         let SingleProduct = await Product.findById(id);
         res.status(200).json({ data : SingleProduct })
    } catch (error) {
        next(error)
    }
})
export let AllProduct = asyncHandler(async (req,res,next) => {
    let qNew = req.query.new;
    let qCatagory = req.query.cat;
    let products = []
    if(qNew){
        products = await Product.find({}).sort({ createdAt : -1})
    }else if(qCatagory){
        products = await Product.find({
             catagories : {
                $in : [qCatagory]
             }
        })
    }else{
        products = await Product.find({})
    }
    res.status(200).json({ data : products })
})
export let getRandomData = asyncHandler(async (req,res,next) => {
    try {
        let random = await Product.aggregate([{
            $sample : {
                size : 5
            }
        }])
        res.status(200).json({ data : random })
    } catch (error) {
        next(error)
    }
})
export let GetCatagory = asyncHandler(async (req,res,next) => {
    let { cat } = req.params;
    let products = await Product.find({
             catagories : {
                $in : [cat]
             }
        })
        res.status(200).json({ data : products })
})
export let GetCatagoryByCatandColor = asyncHandler(async (req,res,next) => {
    try {
        let cat  = req.query.cat;
        let color = req.query.color
        let products = await Product.find({
             $or : [
                { 
                    catagories : { 
                        $in : [cat] 
                    }, 
                    color : {
                        $in : [color] 
                    } 
                }]
            })
        res.status(200).json({ data : products })
    } catch (error) {
        next(error)
    }
})