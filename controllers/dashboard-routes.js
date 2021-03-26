const router = require("express").Router();
const sequelize = require('../config/connection');
//Provides requirement of being logged in (withAuth) to access certain features of blog
const withAuth = require("../utils/auth");
const { Deck, User, Comment } = require("../models");

//Prevents users from accessing Dashboard w/out being logged in
router.get("/", withAuth, (req, res) => {
  Deck.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ["id", "deck_name", "user_id",  "created_at"],
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
      const decks = dbDeckData.map((deck) => deck.get({ plain: true }));
      res.render("dashboard", { decks, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Deck.findByPk( req.params.id, {
    attributes: ["id", "deck_name", "user_id", "created_at"],
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
      if (dbDeckData) {
        const deck = dbDeckData.get({ plain: true });

        res.render("edit-deck", {
          deck,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new/", withAuth, (req, res) => {
  res.render("new-deck", {
    loggedIn: true,
  });
});

module.exports = router;
