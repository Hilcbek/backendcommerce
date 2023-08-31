import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()
let StripeObj = new Stripe(process.env.STRIPE_SECREAT_KEY)
export let Payment = (req,res,next) => {
    try {
        StripeObj.charges.create({
            source : req.body.tokenId,
            amount : req.body.amount,
            currency : "usd"
        },
        (stripeErr,stripeRes) => {
            if(stripeErr){
                res.status(500).json(stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        }
        )
    } catch (error) {
        next(error)
    }
} 