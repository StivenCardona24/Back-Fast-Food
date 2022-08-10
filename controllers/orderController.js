const { response, request } = require('express');
const { Order, State, OrderedProduct, Product } = require('../models');

const { 
    createNewOrderedProduct,
    deleteOrderedProduct,
    } = require('../controllers/orderedProductController');




const getAllOrders= async(req = request, res = response) => {
    //obtener todos los cursos
    await Order.findAll({attributes:[
        'id', 'quantity', 'price', 'state_id', 'date'
    ], include: [{model: State, 
        attributes: ['id', 'name']}]})
        .then(order => {
            const data = JSON.stringify(order);
            const results = JSON.parse(data);
            
            
            if (results.length > 0) {
               
                    res.json({
                        results
                        // products
                    });
             
            }else{
                res.status(404).send('No hay pedidos registrados');
            }
        }).catch(error => {
            console.log(error);
        });

      
};

const getOneOrder = async(req = request, res = response) => {

//    await getOrderedProduct(req.params.id);
//     console.log(products);

    await Order.findOne({attributes:[
        'id', 'quantity', 'price', 'date', 'state_id'
    ], 
    include: [{model: State, 
        attributes: ['id', 'name']}],
    
    where: { id: req.params.id } })
        .then(order => {
            let data = JSON.stringify(order);
       
            const results = JSON.parse(data);
          
            if (results != null) {
                    res.json({
                        results
                        // products
                    });
        
            }else{
                res.status(404).send(`Pedido con id: ${req.params.id} no encontrado`);
            }
            
        }).catch(error => {
            console.log(error);
        });

    // getOrderedProduct(req.params.id, res);
    
};

const createNewOrder = async(req = request, res = response) => {
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
   
   
        let prods = req.body.products;
        console.log(prods);

        

        await Order.create(
            {
                
            quantity: req.body.quantity,
            price: req.body.price,
            state_id:  req.body.state_id,
            date: req.body.date,

        }, { fields: ['quantity', 'price', 'state_id', 'date'] })
            .then(order => {

               
               
                if (order) {
                    prods.forEach(prod => {

                        createNewOrderedProduct(prod.id_product, order.id, prod.quantity, prod.price );
                    });
                    
                    res.send({
                        order,
                        msg: 'Pedido creado correctamente'
                    });
                    
                } else {
                    res.status(400).send('Error in insert new record');
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

const updateOneOrder = async(req = request, res = response) => {

       const prods = req.body.products;
        await Order.update({ 
            quantity: req.body.quantity,
            price: req.body.price,
            state_id:  req.body.state_id,
            date: req.body.date,
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(order => {
                if (order) {
                    deleteOrderedProduct(req.params.id);
                    prods.forEach(prod => {

                        createNewOrderedProduct(prod.id_product, req.params.id, prod.quantity, prod.price );
                    });
                    res.status(200).send(`Pedido con id: ${req.params.id} fue actualizado correctamente`);
                }
                else{
                    res.status(404).send(`Pedido con id: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            });
    }
   
    


const deleteOneOrder = async(req = request, res = response) => {

    deleteOrderedProduct(req.params.id);
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(order => {
                if (order != 0) {
                    res.status(200).send(`Pedido con id: ${req.params.id} fue borrado correctamente`);
                }else{
                    res.status(404).send(`Pedido con id: ${req.params.id} no encontrado`);
                }
                
            }).catch(error => {
                console.log(error);
            })
    
};


async function getOrderedProduct(req = request, res = response){//obtener todos los cursos
    await OrderedProduct.findAll({attributes:[
        'id','quantity', 'price'
    ],
    include: [
        {model: Product, 
        attributes: ['id', 'name', 'price']},
    ],
     where: { id_order: req.params.id} })
        .then(order => {
            const data = JSON.stringify(order);
           const results = JSON.parse(data);
            // console.log(results);
            if (results.length > 0) {
                res.send({
                    results,
                });
            }
            else{
                res.status(404).send(`Pedido con id: ${req.params.id} no encontrado`);
            }
        }).catch(error => {
            console.log(error);
        });
};





module.exports = {
    getAllOrders,
    getOneOrder,
    createNewOrder,
    updateOneOrder,
    deleteOneOrder,
    getOrderedProduct
    
};
