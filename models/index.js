

const Order = require('./order');

const Product = require('./product');
const Server = require('./server');
const TypeFood = require('./type');
const State = require('./state.js')

//FK tables relationships

//FK product-type
Product.belongsTo(TypeFood, {foreignKey: 'type_id'});
TypeFood.hasMany(Product, {foreignKey: 'type_id'});

module.exports = {//es adecuado que este en orden alfabetico

    Order,
    main,
    Product,
    Server,
    TypeFood,
    State
}
