const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Card, Deck } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, (req, res) => {  
   Card.findByPk( req.params.id, {
     attributes: ['id', 'card_front', 'card_back', 'deck_id'],
    include: [
      {
        model: Deck, 
        attributes: ['id', 'deck_name', 'user_id']
      }, 
      {
        model: User, 
        attributes: ['username'],
      }
    ]
  })
    .then((dbCardData) => {
      if (dbCardData) {
        const card = dbCardData.get({ plain: true });
        console.log(card)

        res.render('single-deck', {
          card, 
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/add/:deckId', withAuth, (req, res) => {
  res.render('new-card');
});

module.exports = router;