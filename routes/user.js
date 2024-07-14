require('dotenv').config();
const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const User = require('./../models/User')
const path = require('path')

// Not sure how to work with this yet.
// Is this needed considering we only have admin as the only user? NEED to confirm with Sarah/Liana

// PUT - add favourite to user ---------------------------------------------
router.put('/addFav/', Utils.authenticateToken, async (req, res) => {  
  // validate check
  console.log('addFav called with:', req.body) // Add logging
  if (!req.body.eventId) {
    return res.status(400).json({
      message: "Nothing specified"
    })
  }
  // add _Id to favouriteEvents field (array = push)
  User.updateOne({ 
    _id: req.user._id 
  }, {
      $push: {
        favouriteEvents: req.body.Id
      }
    }
  )
  .then((user) => {
    res.json({
      message: "Added to favourites"
    })
  })
  .catch(err => {
    console.error('Error adding favourite', err) // Add logging
    res.status(500).json({
      message: "Problem adding favourite"
    })
  })
})

// GET - get single user -------------------------------------------------------
router.get('/:id', Utils.authenticateToken, (req, res) => {
  if(req.user._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }

  User.findById(req.params.id).populate('favouriteEvents')
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error('Error fetching user:', err) // Add logging
      res.status(500).json({
        message: "Couldn't get user",
        error: err
      })
    })
})
//Does the Admin have 'profile' or do they just sign in and thats it. Do they have an avatar, bio, etc? 

// PUT - update user ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Task content can't be empty")
  
  let avatarFilename = null

  // if avatar image exists, upload!
  if(req.files && req.files.avatar){
    // upload avater image then update user
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.avatar, uploadPath, (uniqueFilename) => {
      avatarFilename = uniqueFilename
      // update user with all fields including avatar
      updateUser({
        email: req.body.email,
        password: req.body.password,
        accessLevel: admin        
      })
    })
  }else{
    // update user without avatar
    updateUser(req.body)
  }
  
  // update User
  function updateUser(update){    
    User.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(user => res.json(user))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating user',
        error: err
      })
    }) 
  }
})

//Does the admin need to be able to create new users? 
//Do they need to create an account on the site or is it already existing in the database?

// POST - create new user --------------------------------------
router.post('/', (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "User content can not be empty"})
  }

  // check account with email doen't already exist
  User.findOne({email: req.body.email})
  .then(user => {
    if( user != null ){
      return res.status(400).json({
        message: "email already in use, use different email address"
      })
    }
  // create new user       
  let newUser = new User(req.body)
  newUser.save()
    .then(user => {        
      // success!  
      // return 201 status with user object
      return res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating account",
        error: err
      })
    })
  })
})

module.exports = router