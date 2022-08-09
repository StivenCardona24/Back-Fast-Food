

const Order = require('./order');
const Product = require('./product');
const Server = require('./server');
const TypeFood = require('./type');
const State = require('./state.js');
const OrderedProduct = require('./orderedProduct');

//FK tables relationships

//FK product-type
Product.belongsTo(TypeFood, {foreignKey: 'type_id'});
TypeFood.hasMany(Product, {foreignKey: 'type_id'});

//FK order-state
Order.belongsTo(State, {foreignKey: 'state_id'});
State.hasMany(Order, {foreignKey: 'state_id'});

module.exports = {//es adecuado que este en orden alfabetico

    Order,
    Product,
    Server,
    TypeFood,
    State,
    OrderedProduct
}
