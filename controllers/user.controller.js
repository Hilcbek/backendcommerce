import User from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import {ErrorShower} from '../Error/error.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export let Register = asyncHandler(async (req,res,next) => {
    try {
        let genSalt = await bcrypt.genSalt(10)
        let {username,email,password,profile} = req.body;
        if (!username || !email || !password) return next(ErrorShower(500 , 'All credentials are required!'))
        let Username = await User.findOne({ username : username })
        if(Username) return next(ErrorShower(500, 'User exist!'))
        let Email = await User.findOne({ email : email })
        if(Email) return next(ErrorShower(500, 'email already exist!'))

        let NewUser = await User.create({
            ...req.body,
            password : await bcrypt.hash(password,genSalt)
        })
        res.status(200).json({ data : NewUser })
    } catch (error) {
        next(error)
    }
})
export let Login = asyncHandler(async (req,res,next) => {
    let {user} = req.body;
    if(!user || !req.body.password) return next(ErrorShower(500, 'All credentials are required!'))
    let UserExist = await User.find({ $or : [{ username : user}, {email : user}]})
    if(!UserExist[0]) return next(ErrorShower(500, 'wrong username or email address'))
    let Password = await bcrypt.compare(req.body.password,UserExist[0].password)
    if(!Password) return next(ErrorShower(500, 'wrong password or username or email address'))
    let {password ,...UserData} = UserExist[0]._doc;
    jwt.sign({ id : UserData._id, isAdmin : UserData.isAdmin}, process.env.JWT, { expiresIn : '6h'}, (err,payload) => {
        if(err) return next(ErrorShower(500, 'error while generating token!'))
        res.cookie('token',payload, { httpOnly : true }).status(200).json({data : UserData})
    })
})
export let Logout =  (req,res,next) => {
    try {
        res.clearCookie('token').status(200).json({ data : 'user logged out!'})
    } catch (error) {
        next(error)
    }
}