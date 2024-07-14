const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

const eventSchema = new mongoose.Schema({
  eventdisplayname: {
    type: String,
    required: true
  },
  vendorcontactname: {
    type: String,
    required: true
  },
  vendorcontactemail: {
    type: String,
    required: true
  },
  vendorcontactphone: {
    type: String,
    required: true
  },
  eventcategory: {
    type: String,
    required: true
  },
  eventtag: {
    type: String,
    required: true
  },
  eventoperationdatetime: {
    type: String,
    required: true
  },
  eventstallnumber: {
    type: String,
    required: true
  },
  eventdescription: {
    type: String,
    required: true
  },
  eventimage: {
    type: String,
    required: true
  },
  authoredBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'   
  }
  //Add more fields as needed
}, { timestamps: true })

const event = mongoose.model('event', eventSchema)

module.exports = event
