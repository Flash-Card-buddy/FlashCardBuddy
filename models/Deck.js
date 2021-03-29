const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Post model
class Deck extends Model {}

// create fields/columns for Post model
Deck.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    deck_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },  
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "deck",
  }
);

module.exports = Deck;
