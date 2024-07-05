// Dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const fileUpload = require('express-fileupload')

const uri = process.env.MONGO_URI;
console.log('MongoDB URI:', uri); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => 
    console.log('Connected to MongoDB'))
  .catch(err => 
    console.error('Error connecting to MongoDB:', err))

// Middleware
// express app setup -----------------------
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('*', cors())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))

// routes ---------------------------------
//homepage
app.get('/', (req, res) => {
  res.send("Homepage")
})

// auth
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

// user (Admin Login/hub/terminal)
const userRouter = require('./routes/user')
app.use('/user', userRouter)

// story
const storyRouter = require('./routes/event')
app.use('/events', storyRouter)

// run app listen on port --------------------
app.listen(port, () => {
  console.log("App running on port ", port)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); 