const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Card, Deck } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, (req, res) => {
//   var mappedUserArray;
//   Card.findAll({
//     where: {
//       user_id: req.session.user_id,
//     }, 
//     include: [
//       {
//         model: User, 
//         attributes: ['username']
//       }, 
//       {
//         model: Deck, 
//         attributes: ['id', 'deck_name', 'user_id']
//       }
//     ]
//   })
//   .then((dbData) => {
//     var mappedUserArray = dbData
//     .map((element, i) => {
//       var cardArray1 = {
//         id: element.dataValues.id,
//         card_front: element.dataValues.deck.card_front,
//         card_back: element.dataValues.deck.card_back,
//         deck_id: element.dataValues.deck.deck_id,
//         user_id: element.dataValues.deck.user_id
//       };
//       return cardArray1;
//     });
//     res.render('deck', {
//       cardObj: mappedUserArray
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// })

router.get('/add/:deckId', withAuth, (req, res) => {
  res.render('new-card');
});

module.exports = router;