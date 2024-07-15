// Dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;
console.log('MongoDB URI:', uri);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}));

// Routes
app.get('/', (req, res) => {
  res.send("Homepage");
});

//auth routes
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

//user routes
const userRouter = require('./routes/user');
app.use('/user', userRouter);

//  event routes  
const eventRouter = require('./routes/events');
app.use('/events', eventRouter);

const publicRoutes = require('./routes/publicRoutes'); // Adjust the path as necessary
app.use('/public', publicRoutes); // Prefix all routes with /api/public

// Run app listen on port
app.listen(port, () => {
  console.log("App running on port ", port);

  
});
