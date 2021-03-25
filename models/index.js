// import all models
const Deck = require('./Deck');
const User = require('./User');
const Comment = require('./Comment');
const Card = require('./Card');
// const Friend = require('./Friend')

// create associations
// need to add Friend associations
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
  foreignKey: 'deck_id'
});


// Friend.belongsTo(User, {
//   foreignKey: 'user_id'
// })

// User.hasMany(Friend, {
//   foreignKey: 'friend_id'
// })

module.exports = { User, Deck, Comment, Card};
