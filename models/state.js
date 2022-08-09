const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const State = sequelize.define('states', {
    // Model attributes are defined here
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(State === sequelize.models.State); // true

module.exports = State;