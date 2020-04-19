const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
// user/
router.post('/signup' , (req , res) =>{
    const newUser = {
        firstName : req.body.firstName , 
        lastName : req.body.lastName ,
        email : req.body.email ,
        password : req.body.password , 
        image : req.body.image
    }
    // res.send(newUser)
    User.findOne({email : newUser.email})
    .then(user =>{
        // if email not incloads the database
        if (!user){
            bcrypt.hash(newUser.password , 10 , (err , hash) =>{
                newUser.password = hash
                User.create(newUser)
                .then(() => res.json({msg : "user created" , userInf : newUser , signup : true }))
            })
        }else{
            //if email have been used 
            res.json( {msg :'email  used' , signup : false} )
        }
    })
    .catch(err => res.json(err))
})
router.post('/signin'  , (req , res) =>{
    const signinUser = {
        email : req.body.email , 
        password : req.body.password
    }
    User.findOne({email : signinUser.email})
    .then(user =>{
        //if email exist
        if(user){        
            // if password is correct 
            if (bcrypt.compareSync(signinUser.password , user.password)){
                user.password = undefined
                let payload = {user}
                let token = jwt.sign(payload , "SECRET" , {expiresIn : 1500})
                res.json({token , signin : true})
                // if password is not correct 
            }else{
            res.json({msg : 'password is not correct'})
            }
             //if email not exist
        }else {
            res.json({msg : 'email is not found'})
        }
    }).catch(err => res.json(err))
})
module.exports = router;