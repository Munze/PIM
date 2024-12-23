const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Supplier extends Model {}

Supplier.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feedUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feedType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soapBody: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type_tested: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'N/A',
  },
}, {
  sequelize,
  modelName: 'Supplier',
});

module.exports = Supplier;
