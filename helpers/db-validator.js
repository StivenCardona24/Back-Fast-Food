
const { 
    Product, TypeFood, Order, State 
} = require('../models');


//Validar si un número de documento ya esta registrado en la DB
const productValidator = async(name = '') => {
    
    const productExists = await Product.findOne({ where: { name: name } });
    if ( productExists ){
        throw new Error(`The product ${name}, is already in the database`);
    }

}

//Validar si un usuario existe en la DB -- validador personalizado
const productExistingId = async(id = '') => {
    
    const productExisting = await Product.findByPk(id);
    if ( !productExisting ){
        throw new Error(`Product with id: ${id} doesn't exists`);
    }

}

//Validar si la area de estudio existe en la DB -- validador personalizado
const typeExistingId = async(id = '') => {
    
    const typeExisting = await TypeFood.findByPk(id);
    if ( !typeExisting ){
        throw new Error(`Type with id: ${id} doesn't exists`);
    }

}

const orderExistingId = async(id = '') => {
    
    const orderExisting = await Order.findByPk(id);
    if ( !orderExisting ){
        throw new Error(`Order with id: ${id} doesn't exists`);
    }

}

const stateExistingId = async(id = '') => {
    
    const stateExisting = await State.findByPk(id);
    if ( !stateExisting ){
        throw new Error(`State with id: ${id} doesn't exists`);
    }

}


const getProductsExisting = async(prods = '') => {

    
    prods.forEach(prod => {
        productExistingId(prod.id_product);
        
    });
}






module.exports = {
    productExistingId,
    productValidator,
    typeExistingId,
    orderExistingId,
    stateExistingId,
    getProductsExisting
}