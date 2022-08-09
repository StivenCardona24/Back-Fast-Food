const { response, request } = require('express');
const { Order, State, OrderedProduct, Product } = require('../models');





const getAllOrderedProduct= async(req = request, res = response) => {//obtener todos los cursos
    await OrderedProduct.findAll({attributes:[
        'id', 'quantity', 'price'
    ], include: [{model: Order, 
        attributes: ['id', 'quantity', 'price']},
        {model: Product, 
        attributes: ['id', 'name']},
    ]})
        .then(order => {
            const data = JSON.stringify(order);
            const results = JSON.parse(data);
            
            if (results.length > 0) {
                res.json({
                    results
                });
            }else{
                res.status(404).send('No hay pedidos registrados');
            }
        }).catch(error => {
            console.log(error);
        });
};

const getOneOrderedProduct = async(req = request, res = response) => {
    await OrderedProduct.findOne({attributes:[
        'id', 'quantity', 'price'
    ],
    include: [{model: Order, 
        attributes: ['id', 'quantity', 'price']},
        {model: Product, 
        attributes: ['id', 'name']},
    ],
     where: { id: req.params.id } })
        .then(order => {
            const data = JSON.stringify(order);
            const results = JSON.parse(data);
            if (results != null) {
                res.json({
                    results
                });
            }else{
                res.status(404).send(`Pedido con id: ${req.params.id} no encontrado`);
            }
            
        }).catch(error => {
            console.log(error);
        });
    
};

const createNewOrderedProduct = async(id_product = '', id_order = '', quantity = '', price= ''  ) => {
    //res.send(`Create course ${req.params.id}`);


    // console.log(`There are ${await Project.count()} projects`);

    // const amount = await Project.count({
    // where: {
    //     id: {
    //         [Op.gt]: 25
    //     }   
    // }
    // } );
    // console.log(`There are ${amount} projects with an id greater than 25`);
   
   
        await OrderedProduct.create(
            {
            id_product: id_product,
            id_order: id_order,
            quantity: quantity,
            price: price,
          

        }, { fields: ['id_product', 'id_order', 'quantity', 'price',] })
            .then(order => {
               
                if (order) {
                    
                        console.log( 'producto agregado al pedido correctamente')      
                    
                } else {
                   console.log('Error in insert new record');
                }
                
            }).catch(error => {
                console.log(error);
            });
    };
    
    





// //Validar que un curso este registrado en una misma matricula 
// const courseValidator = async(id_matr = '', id_curso = '') => {
//     console.log(id_matr, id_curso);
//     const courseExists = await RegistrationCourse.findOne({ where: { id_matr: id_matr, id_curso: id_curso } });
//     if ( courseExists ){
//         return false
//     }
//     return 

// }

const updateOneOrderedProduct = async(id_product = '', id_order = '', quantity = '', price= '' ) => {


        await OrderedProduct.update({ 
            id_product: id_product,
            id_order: id_order,
            quantity: quantity,
            price: price,
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(order => {
                if (order != 0) {
                   console.log(`Producto con id: ${req.params.id} fue actualizado correctamente`);
                }else{
                    console.log(`Producto con id: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            });
    }
   
    


const deleteOneOrderedProduct = async(req = request, res = response) => {

        await OrderedProduct.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(order => {
                if (order != 0) {
                    console.log(`Producto con id: ${req.params.id} fue borrado correctamente`);
                }else{
                  console.log(`Producto con id: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            })
    
};



module.exports = {
    getAllOrderedProduct,
    getOneOrderedProduct,
    createNewOrderedProduct,
    updateOneOrderedProduct,
    deleteOneOrderedProduct,
    
};
