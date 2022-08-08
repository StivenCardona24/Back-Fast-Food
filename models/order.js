const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const Order = sequelize.define('order', {
    // Model attributes are defined here
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(Order === sequelize.models.Order); // true

module.exports = Order;