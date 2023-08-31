import jwt from 'jsonwebtoken'
import { ErrorShower } from '../Error/error.js'
export let verifyUserILoggedInForBackend = (req,res,next) => {
    try {
        let { token } = req.cookies
        if (token){
            jwt.verify(token, process.env.JWT, (err,payload) => {
                if(err) return next(ErrorShower(500, 'token expired!'))
                req.user = payload
                next()
            })
        }else{
            return next(ErrorShower(500, 'Unauthorized!'))
        }
    } catch (error) {
        next(error)
    }
}
export let verifyIsUserAdmin = (req,res,next) => {
    try {
        verifyUserILoggedInForBackend(req,res,() => {
            if(!req.user.isAdmin) return next(ErrorShower(500, 'Admin privillage!'))
            next()
        })
    } catch (error) {
        next(error)
    }
}