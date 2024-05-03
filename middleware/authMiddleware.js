const jwt = require('jsonwebtoken');
const prisma = require('../infrastructure/db');

const requireAuth = (req, res, next) =>{
    
    const token = req.cookies.jwt;

    //check if json web token exists and is verified
    if(token){
        jwt.verify(token, 'Secret APDSCD', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/')
            }else{
                console.log(decodedToken)
                next();
            }
        })
    }else{
        res.redirect('/')
    }
}

//check current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'Secret APDSCD', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken)

                const user = await prisma.user.findUnique({
                    id: decodedToken.id
                })
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};