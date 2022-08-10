const { Router } = require('express');


const { check } = require('express-validator');

const {
    valFields, 
} = require('../middlewares');
const { orderExistingId, productExistingId, orderedProdExistingId} = require('../helpers/db-validator');



const { getAllOrderedProduct,
    getOneOrderedProduct,
    updateOneOrderedProduct,
    deleteOneOrderedProduct,
    createOrderedProduct
     } = require('../controllers/orderedProductController');




const router = Router();

router.get('/', getAllOrderedProduct);

router.get('/:id', [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderedProdExistingId ),
    valFields
], getOneOrderedProduct);

// router.get('/products/:id', [
//     check('id', 'No es un ID válido').isNumeric(),
//     check('id').custom( orderedProdExistingId ),
//     valFields
// ], getOrderedProduct);



router.put('/:id', [
   
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderedProdExistingId ),
    check('id_product', 'No es un valor valido').isNumeric(),
    check('id_product').custom(productExistingId),
    check('id_order', 'No es un valor valido').isNumeric(),
    check('id_order').custom(orderExistingId),
    check('price', 'No es un valor valido').isNumeric(),
    check('quantity').isNumeric(),


    // check('id_matr', 'id_curso').custom(courseValidator),
    valFields
], updateOneOrderedProduct);

router.post('/', [
  
    check('id_product', 'No es un valor valido').isNumeric(),
    check('id_product').custom(productExistingId),
    check('id_order', 'No es un valor valido').isNumeric(),
    check('id_order').custom(orderExistingId),
    check('price', 'No es un valor valido').isNumeric(),
    check('quantity').isNumeric(),
    // check('id_matr', 'id_curso').custom(courseValidator),
    valFields
], createOrderedProduct);

router.delete('/:id',  [
  
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderedProdExistingId),
    valFields
],deleteOneOrderedProduct);



module.exports = router;