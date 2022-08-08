
const Order = require('./order');
const Product = require('./product');
const Server = require('./server');
const TypeFood = require('./type');

//FK tables relationships

//FK product-type
Product.belongsTo(TypeFood, {foreignKey: 'type_id'});
TypeFood.hasMany(Product, {foreignKey: 'type_id'});

module.exports = {//es adecuado que este en orden alfabetico
    Order,
    Product,
    Server,
    TypeFood
}
