const router = require("express").Router();
const sequelize = require("../config/connection");
const { Deck, User, Comment, Card } = require("../models");
let nextCounter = 0;
let previousCounter = 0;

const helpers = require("../utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
let positionCounter = 0;
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
        model: Card,
        attributes: ["id", "card_front", "card_back", "deck_id"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbDeckData) => {
      if (!dbDeckData) {
        res.status(404).json({ message: "There's no deck found with that id" });
        return;
      }
      positionCounter = 0;
      nextCounter = 1;
      previousCounter = 0;
      hbs.handlebars.registerHelper("position", function () {
        if (positionCounter >= dbDeckData.cards.length) {
          return (positionCounter = dbDeckData.cards.length);
        }
        return positionCounter++;
      });

      hbs.handlebars.registerHelper("nextPosition", function () {
        if (nextCounter >= dbDeckData.cards.length) {
          return (nextCounter = dbDeckData.cards.length - 1);
        }

        return nextCounter++;
      });
      hbs.handlebars.registerHelper("previousPosition", function () {
        previousCounter = nextCounter - 1;
        if (previousCounter < 0) {
          return (previousCounter = 0);
        }

        return previousCounter;
      });

      // serialize the data
      const deck = dbDeckData.get({ plain: true });
      console.log("deck", deck.cards);

      console.log(dbDeckData.cards[0].dataValues.card_front);
      // pass data to template
      res.render("single-deck", {
        decks: dbDeckData.cards,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
