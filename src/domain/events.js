const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
  });

const Event  = mongoose.model('Event', eventSchema);

router.post('/', async (req, res) => {
  const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
});

router.get('/', async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

module.exports = router;