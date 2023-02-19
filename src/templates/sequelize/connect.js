const { Sequelize, Model, DataTypes } = require('sequelize');

const <%= db.toUpperCase() %>_URL = process.env.<%= db.toUpperCase() %>_URL;

const sequelize = new Sequelize(<%= db.toUpperCase() %>_URL);

module.exports = {
  sequelize,
  Model,
  DataTypes
}