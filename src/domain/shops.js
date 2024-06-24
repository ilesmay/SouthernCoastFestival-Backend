const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
  });

const Shop  = mongoose.model('shop', shopSchema);

router.post('/', async (req, res) => {
  const shop = new shop(req.body);
    await shop.save();
    res.status(201).send(shop);
});

router.get('/', async (req, res) => {
    const shops = await Shop.find();
    res.send(shops);
});

module.exports = router;