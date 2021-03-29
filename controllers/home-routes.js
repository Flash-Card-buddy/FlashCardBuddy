const router = require("express").Router();
const sequelize = require('../config/connection');
const { Deck, User, Comment, Card } = require("../models");

router.get("/", (req, res) => {
  Deck.findAll({
    attributes: ["id", "deck_name", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "deck_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbDeckData) => {
      // Serialization of data is not needed here due to API routes being built. The res.json() method automatically does that for you.
      const deck = dbDeckData.map((deck) => deck.get({ plain: true }));

      res.render("homepage", {
        deck,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});


router.get("/deck/:id", (req, res) => {
  Deck.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "deck_name", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "deck_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Card, 
        attributes: ['id', 'card_front' , 'card_back']
      }
    ],
  })
    .then((dbDeckData) => {
      if (!dbDeckData) {
        res.status(404).json({ message: "There's no deck found with that id" });
        return;
      }

      // serialize the data
      const deck = dbDeckData.get({ plain: true });

      // pass data to template
      res.render("single-deck", {
        deck,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
