const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Adjust the path as necessary

// Public route to get events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events, adjust query as needed
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;