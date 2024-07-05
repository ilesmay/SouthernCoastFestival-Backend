const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

// USER = ADMIN IN THIS CASE, as only the users with the role 'admin' can access the admin panel

// Adjusted schema for admin use
const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true    
  },
  password: {
    type: String,
    required: true
  },
  accessLevel: {
    type: String, // Changed from Number to String
    required: true,
    default: 'admin' // Assuming 'admin' will be the default value THIS IS A GUESS
  },
  // Additional fields relevant to admin functionality can be added here
  favourites: [
    { type: Schema.ObjectId, ref: 'Favourites'}
  ]
}, { timestamps: true })

// encrypt password field on save
userSchema.pre('save', function(next) {
  // check if password is present and is modifed  
  if( this.password && this.isModified() ){
      this.password = Utils.hashPassword(this.password);
  }
  next()
})

// model
const userModel = mongoose.model('User', userSchema)

// export
module.exports = userModel

