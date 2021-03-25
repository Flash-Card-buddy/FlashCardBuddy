const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Card extends Model {}

// create fields/columns for Post model
Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    deck_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'deck',
        key: 'id'
      }      
    },
    card_front: {
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        len: [1,280]
      }
    },
    card_back: {
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        len: [1,280]
      }
    }
    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'card'
  }
);

module.exports = Card;
