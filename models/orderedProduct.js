const { Sequelize, DataTypes } = require('sequelize');

//Importación de parámetros de conexión MySQL con sequelize
const { sequelize } = require('../database/config');

const OrderedProduct = sequelize.define('ordered_products', {
    // Model attributes are defined here
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    // Other model options go here
});

  // `sequelize.define` also returns the model
  console.log(OrderedProduct === sequelize.models.OrderedProduct); // true

module.exports = OrderedProduct;