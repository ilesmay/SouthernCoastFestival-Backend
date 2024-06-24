const express = require('express');
const mongoose = require('mongoose');
const eventsRouter = require('./domain/events');
const shopsRouter = require('./domain/shops');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://user1234:HJtcNKwzdLLCh2HU@southerncoastfestivalcl.qsfiuve.mongodb.net/');

app.use(express.json());
app.use('/events', eventsRouter);
app.use('/shops', shopsRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); 

// Run the app
// $ node src/app.js
// Example app listening at http://localhost:3000

// MongoDB Connection Username: user1234 Password: HJtcNKwzdLLCh2HU
// URL: mongodb+srv://user1234:HJtcNKwzdLLCh2HU@southerncoastfestivalcl.qsfiuve.mongodb.net/