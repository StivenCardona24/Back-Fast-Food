const { response, request } = require('express');
const { Product, TypeFood } = require('../models');

const cloudinary = require('cloudinary').v2//imports cloudinary v2
cloudinary.config( process.env.CLOUDINARY_URL ); //Cloudinary configuration using the specified ENV variable

const getAllProducts = async(req = request, res = response) => { //brings all the products from the db products table

    const products = await Product.findAll({attributes: {exclude: 'type_id'}, include: [{ model: TypeFood}]});
    if (products.length > 0) {
        res.json({
            products
        });
    }else{
        res.status(404).send('Products not found');
    }
    
};

const getOneProduct = async(req = request, res = response) => {//brings one product from the db products table by using a specified id
    const product = await Product.findOne({where: { id: req.params.id }, attributes: {exclude: 'type_id'} ,include: [{ model: TypeFood}]});

    if (product) {
        res.json({
            product
        });
    }else{
        res.status(404).send('Product not found');
    }
    
};

const createNewProduct = async(req = request, res = response) => {//creates a new product using the sequelize create method
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

        if (req.files) {
            const products = await Product.findAll();
            let model;

            model = await Product.findByPk(products[products.length - 1].dataValues.id);

            //Limpiar imagenes previas
            if (model.img) {
                const nombreArr = model.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [ public_id ] = nombre.split('.'); //id publico de cloudinary
                cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id
            }

            const { tempFilePath } = req.files.img

            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            model.img = secure_url;

            await model.save();
        }
    
};

const updateOneProduct = async(req = request, res = response) => {//updates a product from the db by using an id
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
            if (product != 0 || req.files) {
                res.status(200).send(`Product with id: ${req.params.id} was updated`);
            }else{
                res.status(404).send(`Product with id: ${req.params.id} not found`);
            }
            
        }).catch(error => {
            console.log(error);
        });

        if (req.files) {
            let model;
            model = await Product.findByPk(req.params.id);

            //Limpiar imagenes previas
            if (model.img) {
                const nombreArr = model.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [ public_id ] = nombre.split('.'); //id publico de cloudinary
                cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id
            }

            const { tempFilePath } = req.files.img

            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            model.img = secure_url;

            await model.save();
        }
};

const deleteOneProduct = async(req = request, res = response) => {

    //Limpiar imagenes
    let model = await Product.findByPk(req.params.id);
    if (model.img) {
        const nombreArr = model.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.'); //id publico de cloudinary
        cloudinary.uploader.destroy( public_id ); //metodo de cloudinary que borra segun el public id
    }

    const product = await Product.destroy({ where: { id: req.params.id } });
    
    if (product != 0) {
        res.status(200).send(`Product with id: ${req.params.id} was deleted`);
    }else{
        res.status(404).send(`Product with id: ${req.params.id} not found`);
    }
    
};

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct
};