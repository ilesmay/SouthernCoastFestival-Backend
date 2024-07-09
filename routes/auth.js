require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('./../models/User')
const Utils = require('./../utils')
const jwt = require('jsonwebtoken')

// USER = ADMIN IN THIS CASE, as only the users with the role 'admin' can access the admin panel

// POST /signIn ---------------------------------------
router.post('/signin', (req, res) => {
  // 1. check if email and passwore are empty
  if( !req.body.email || !req.body.password ){     
    return res.status(400).json({message: "Please provide email and password"})
  }
  // 2. continue to check credentials
  // find the user in the database
  User.findOne({email: req.body.email})
  .then(async user => {
     // account doesn't exist
     if(user == null) return res.status(400).json({message: 'No account found'})     
     // user exists, now check password
     if( Utils.verifyHash(req.body.password, user.password) ){
        // Check if the user is an admin
        if(user.accessLevel !== 'admin') {
          return res.status(403).json({message: 'Access denied'});
        }
        // Proceed to generate JWT token for the admin
        let payload = {
          _id: user._id          
        }
        let accessToken = Utils.generateAccessToken(payload)        
        // strip the password from our user object        
        user.password = undefined
        // send back response
        return res.json({
          accessToken: accessToken,
          user: user
        })
     }else{
        // Password didn't match
        return res.status(400).json({
           message: "Password / Email incorrect"
        })        
     }
  })
  .catch(error => {
    // Handle any errors that occur during the findOne operation
    console.error('Error fetching user from database:', error);
    return res.status(500).json({message: 'Internal Server Error'});
  });
})


// GET /validate --------------------------------------
router.get('/validate', (req, res) => {   
  // get token
  let token = req.headers['authorization'].split(' ')[1];
  // validate token using jwt
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if(err){
      console.log(err)
      return res.status(401).json({
        message: "Unauthorised"
      })
    }

    // token valid - send back to payload/authData as json
    User.findById(authData._id)
      .then(user => {
        // remove password field (never send this back!)
        user.password = undefined
        res.json({
          user: user
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "problem validating token",
          error: err
        })
      })
  })
})

  
module.exports = router