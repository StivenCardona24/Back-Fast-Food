
const { 
    Product, TypeFood, Order, State, OrderedProduct
} = require('../models');


//Validar si un producto ya esta registrado en la DB
const productValidator = async(name = '') => {
    
    const productExists = await Product.findOne({ where: { name: name } });
    if ( productExists ){
        throw new Error(`The product ${name}, is already in the database`);
    }

}

//Validar si un producto existe en la DB -- validador personalizado
const productExistingId = async(id = '') => {
    
    const productExisting = await Product.findByPk(id);
    if ( !productExisting ){
        throw new Error(`Product with id: ${id} doesn't exists`);
    }

}

//Validar si un tipo de producto existe en la DB -- validador personalizado
const typeExistingId = async(id = '') => {
    
    const typeExisting = await TypeFood.findByPk(id);
    if ( !typeExisting ){
        throw new Error(`Type with id: ${id} doesn't exists`);
    }

}

//validar si una orden existe en la DB
const orderExistingId = async(id = '') => {
    
    const orderExisting = await Order.findByPk(id);
    if ( !orderExisting ){
        throw new Error(`Order with id: ${id} doesn't exists`);
    }

}

//Validar si un estado de la orden existe en la DB
const stateExistingId = async(id = '') => {
    
    const stateExisting = await State.findByPk(id);
    if ( !stateExisting ){
        throw new Error(`State with id: ${id} doesn't exists`);
    }

}

//comprueba que cada producto enviado en la orden exista en la DB
const getProductsExisting = async(prods = '') => {

    
    prods.forEach(prod => {
        productExistingId(prod.id_product);
        
    });
}

//valida si existe una orden por producto en DB
const orderedProdExistingId = async(id = '') => {
    
    const orderExisting = await OrderedProduct.findByPk(id);
    if ( !orderExisting ){
        throw new Error(`Product with id: ${id} doesn't exists in Order`);
    }

}






module.exports = {
    productExistingId,
    productValidator,
    typeExistingId,
    orderExistingId,
    stateExistingId,
    getProductsExisting,
    orderedProdExistingId
}