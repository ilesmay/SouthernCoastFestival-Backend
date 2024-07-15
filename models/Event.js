require('dotenv').config();
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')
require('mongoose-type-email');

const eventSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming 'User' is the name of the collection you're referencing
  eventdisplayname: {
    type: String,
    required: false
  },
  vendorcontactname: {
    type: String,
    required: false
  },
  vendorcontactemail: {
    type: mongoose.SchemaTypes.Email,
    required: false   
  },
  vendorcontactphone: {
    type: String,
    required: false
  },
  eventcategory: {
    type: String,
    required: false
  },
  eventtag: {
    type: String,
    required: false
  },
  eventoperationdatetimestart: {
    type: Date,
    required: false
  },
  eventoperationdatetimeend: {
    type: Date,
    required: false
  },
  eventstallnumber: {
    type: String,
    required: false
  },
  eventdescription: {
    type: String,
    required: false
  },
  eventimage: {
    type: String,
    required: false //changed for testing, if we want to always have photos we can change this to true
  }
  //Add more fields as needed
}, { timestamps: true })

const eventModel = mongoose.model('Event', eventSchema)

module.exports = eventModel