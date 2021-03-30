const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Card, Deck } = require('../models');
const withAuth = require('../utils/auth');

router.get('/add/:deckId', withAuth, (req, res) => {
  res.render('new-card');
});

module.exports = router;