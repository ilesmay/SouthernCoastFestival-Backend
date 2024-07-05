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

//Does the Admin have 'profile' or do they just sign in and thats it. Do they have an avatar, bio, etc? 

// PUT - update user ---------------------------------------------

//Does the admin need to be able to create new users? 
//Do they need to create an account on the site or is it already existing in the database?

// POST - create new user --------------------------------------

module.exports = router