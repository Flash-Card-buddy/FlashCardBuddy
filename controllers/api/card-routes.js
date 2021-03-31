const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Card, Deck } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  if (req.session) {
    console.log('======================');
    Card.findAll({
      attributes: [
        'id',   
        'deck_id',
        'card_front',
        'card_back'
      ],
      include: [
        // {
        //   model: Card,
        //   attributes: ['id', 'deck_id', 'card_front', 'card_back'],
        //   include: {
        //     model: User,
        //     attributes: ['username']
        //   }
        // },
        {
          model: Deck,
          attributes: ["id", "user_id", "deck_name"]
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbCardData => {
      if (!dbCardData) {
        res.status(404).json({ message: 'No cards found' });
        return;
      }
      // res.render('new-card')
      res.json(dbCardData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  }
});

router.get('/:id', withAuth, (req, res) => {
  if (req.session) {
    Card.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',   
        'deck_id',
        'card_front',
        'card_back'
      ],
      include: [
        // {
        //   model: Comment,
        //   attributes: ['id', 'deck_id', 'created_at'],
        //   include: {
        //     model: User,
        //     attributes: ['username']
        //   }
        // },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbCardData => {
        if (!dbCardData) {
          res.status(404).json({ message: 'No cards found with this id' });
          return;
        }
        console.log("dbCardData", dbCardData)
        res.json(dbCardData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.post('/', withAuth, (req, res) => {  
  console.log('route "/" hit')
  console.log(req.body)
   Card.create({
    id: req.body.id,
    card_front: req.body.card_front,
    card_back: req.body.card_back,
    deck_id: req.body.deck_id,
    user_id: req.session.user_id
  })
    .then(dbCardData => {
      console.log('route "/" hit', dbCardData)
      res.json(dbCardData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  if (req.session) {
    Card.update(
      {
        card_front: req.body.card_front,
        card_back: req.body.card_back,
        deck_id: req.body.deck_id
      },
      {
        where: {
          id: req.params.id
        }
      }
      )
      .then(dbCardData => {
        if (!dbCardData) {
          res.status(404).json({ message: 'No card found with this id' });
          return;
        }
        res.json(dbCardData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  if (req.session) {
    Card.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCardData => {
        if (!dbCardData) {
          res.status(404).json({ message: 'No card found with this id' });
          return;
        }
        res.json(dbCardData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;
