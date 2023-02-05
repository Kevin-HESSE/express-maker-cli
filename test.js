const {
  Model,
  Datatypes
} = require('sequelize');

class Vehicule extends Model {}

Vehicule.init({

  constructor: {
    type: Datatypes.STRING,
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'Vehicule',
  tableName: 'vehicule',
  underscored: true,
  timestamps: true
});

module.exports = Vehicule;
