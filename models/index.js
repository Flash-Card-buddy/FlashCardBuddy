// import all models
const Deck = require('./Deck');
const User = require('./User');
const Comment = require('./Comment');
const Card = require('./Card');
const { belongsTo } = require('./Deck');


// create associations

User.hasMany(Deck, {
  foreignKey: 'user_id'
});

Deck.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Deck, {
  foreignKey: 'deck_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Deck.hasMany(Comment, {
  foreignKey: 'deck_id'
});

Deck.hasMany(Card, {
  foreignKey: 'card_id'
});

Card.belongsTo(Deck, {
  foreignKey: 'deck_id'
});



module.exports = { User, Deck, Comment, Card};
