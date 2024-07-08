const express = require('express')
const router = express.Router()
const path = require('path')
const Event = require('../models/Event')
const Utils = require('../utils')

// GET - get all events
router.get('/', Utils.authenticateToken, (req, res) => {
  Event.find().populate('user', '_id firstName lastName')
    .then(events => {
      if (!events.length) {
        return res.status(404).json({
          message: "No events found"
        })
      }
      console.log(events)
      res.json(events)
    })
    .catch(err => {
      console.log('Error fetching events:', err)
      res.status(500).json({
        message: "Problem getting events"
      })
    })
})

// POST - create new Event
router.post('/', Utils.authenticateToken, (req, res) => {

  // validate
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Event content can't be empty" })
  }

  if (!req.files || !req.files.image) {
    return res.status(400).send({ message: "Image can't be empty" })
  }

  const imageFile = req.files.image
  const uploadPath = path.join(__dirname, '..', 'public', 'images')

  Utils.uploadFile(imageFile, uploadPath, (uniqueFilename) => {
    if (!uniqueFilename) {
      return res.status(500).send({ message: "Problem uploading image" })
    }

    // create new Event
    let newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      image: uniqueFilename,
      length: req.body.length,
      artist: req.body.author,
    })

    newEvent.save()
      .then(Event => {
        return res.status(201).json(Event)
      })
      .catch(err => {
        console.error('Error saving Event:', err)
        return res.status(500).send({
          message: "Problem creating Event",
          error: err
        })
      })
  })
})

// export
module.exports = router
