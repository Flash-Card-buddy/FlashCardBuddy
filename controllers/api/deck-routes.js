const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Deck, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log('======================');
  Deck.findAll({
    attributes: [
      'id',   
      'deck_name',  
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'deck_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbDeckData => res.json(dbDeckData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
  Deck.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',  
      'deck_name',    
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'deck_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbDeckData => {
      if (!dbDeckData) {
        res.status(404).json({ message: 'No deck found with this id' });
        return;
      }
      res.json(dbDeckData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {  
  Deck.create({
    id: req.body.id,
    deck_name: req.body.deck_name,
    user_id: req.session.user_id
  })
    .then(dbDeckData => res.json(dbDeckData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Deck.update(
    {
      deck_name: req.body.deck_name
    },
    {
      where: {
        id: req.params.id
      }
    }
    )
    .then(dbDeckData => {
      if (!dbDeckData) {
        res.status(404).json({ message: 'No deck found with this id' });
        return;
      }
      res.json(dbDeckData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Deck.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbDeckData => {
      if (!dbDeckData) {
        res.status(404).json({ message: 'No deck found with this id' });
        return;
      }
      res.json(dbDeckData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
