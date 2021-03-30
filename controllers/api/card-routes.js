const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Card, Deck, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (req, res) => {
  if (req.session) {
    console.log("======================");
    Card.findAll({
      attributes: [
        "id",
        "card_front",
        "card_back"
      ],
      include: [
        {
          model: Deck,
          attributes: [ 'deck_name']
          ,
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then((dbCardData) => {
        if (!dbCardData) {
          res.status(404).json({ message: "No cards found" });
          return;
        }
        res.render("new-card");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.get("/:id", withAuth, (req, res) => {
  if (req.session) {
    Card.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "card_id", "card_front", "card_back"],
    })
      .then((dbCardData) => {
        if (!dbCardData) {
          res.status(404).json({ message: "No cards found with this id" });
          return;
        }
        res.json(dbCardData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.post("/", withAuth, (req, res) => {
  Card.create({
    id: req.body.id,
    card_front: req.body.card_front,
    card_back: req.body.card_back    
  })
    .then((dbCardData) => {
      console.log('route "/" hit', dbCardData);
      res.json(dbCardData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  if (req.session) {
    Card.update(
      {
        id: req.body.id,
        deck_id: req.body.deck_id,
        card_front: req.body.card_front,
        card_back: req.body.card_back
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbCardData) => {
        if (!dbCardData) {
          res.status(404).json({ message: "No card found with this id" });
          return;
        }
        res.json(dbCardData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.delete("/:id", withAuth, (req, res) => {
  if (req.session) {
    Card.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCardData) => {
        if (!dbCardData) {
          res.status(404).json({ message: "No card found with this id" });
          return;
        }
        res.json(dbCardData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;
