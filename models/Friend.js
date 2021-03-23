// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// // create friend model 

// class Friend extends Model {}

// // create fields/columns stores Friend model 
// Friend.init (
//   {
//     id: {
//       type: DataTypes.INTEGER, 
//       allowNull: false, 
//       primaryKey: true, 
//       autoIncrement: true
//     }, 
//     username: {
//       type: DataTypes.STRING, 
//       allowNull: false, 
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     }, 

//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'friend'
//   }
// );

// module.exports = Friend;