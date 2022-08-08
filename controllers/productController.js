const { response, request } = require('express');
const { Product, TypeFood } = require('../models');

const getAllProducts = async(req = request, res = response) => {
    await Product.findAll({attributes:[
        'id', 'name', 'quantity', 'price', 'description', 'img'
    ], include: [{ model: TypeFood}]})
        .then(product => {
            const data = JSON.stringify(product);
            const results = JSON.parse(data);
            if (results.length > 0) {
                res.json({
                    results
                });
            }else{
                res.status(404).send('Products not found');
            }
        }).catch(error => {
            console.log(error);
        });
};

const getOneProduct = async(req = request, res = response) => {
    await Product.findOne({attributes:[
        'id', 'name', 'quantity', 'price', 'description', 'img'
    ], where: { id: req.params.id }, include: [{ model: TypeFood}]})
        .then(product => {
            const data = JSON.stringify(product);
            const results = JSON.parse(data);
            if (results != null) {
                res.json({
                    results
                });
            }else{
                res.status(404).send(`Product with id: ${req.params.id} not found`);
            }
            
        }).catch(error => {
            console.log(error);
        });
    
};

const createNewProduct = async(req = request, res = response) => {
    await Product.create({
        name: req.body.name.toUpperCase(),
        type_id: req.body.type_id,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
    }, { fields: ['name', 'type_id', 'quantity', 'price', 'description'] })
        .then(product => {
            if (product) {
                res.send({
                    product,
                    msg: 'Product was created succesfully'
                });
                
            } else {
                res.status(400).send('Error in insert new record');
            }
            
        }).catch(error => {
            console.log(error);
        });
    
};

const updateOneProduct = async(req = request, res = response) => {
    await Product.update({ 
        name: req.body.name.toUpperCase(),
        type_id: req.body.type_id,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(product => {
            if (product != 0) {
                res.status(200).send(`Product with id: ${req.params.id} was updated`);
            }else{
                res.status(404).send(`Product with id: ${req.params.id} not found`);
            }
            
        }).catch(error => {
            console.log(error);
        });
};

const deleteOneProduct = async(req = request, res = response) => {

        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                if (product != 0) {
                    res.status(200).send(`Product with id: ${req.params.id} was deleted`);
                }else{
                    res.status(404).send(`Product with id: ${req.params.id} not found`);
                }
                
            }).catch(error => {
                console.log(error);
            })
    
};

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct
};