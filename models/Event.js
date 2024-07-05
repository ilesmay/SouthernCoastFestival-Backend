const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  }
  //Add more fields as needed
}, { timestamps: true })

const event = mongoose.model('event', eventSchema)

module.exports = event
