const { Router } = require('express');


const { check } = require('express-validator');

const {
    valFields, 
} = require('../middlewares');
const { orderExistingId, stateExistingId, getProductsExisting, productExistingId} = require('../helpers/db-validator');



const { getAllOrders,
        getOneOrder,
        createNewOrder,
        updateOneOrder,
        deleteOneOrder,
        getOrderedProduct } = require('../controllers/orderController');




const router = Router();

router.get('/', getAllOrders);

router.get('/:id', [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId ),
    valFields
], getOneOrder);

router.get('/products/:id', [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId ),
    valFields
], getOrderedProduct);



router.put('/:id', [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId ),
    check('quantity', 'No es un valor valido').isNumeric(),
    check('price', 'No es un valor valido').isNumeric(),
    check('state_id', 'No es un valor valido').isNumeric(),
    check('state_id').custom( stateExistingId ),
    check('date', 'No es una fecha valida').isDate(),
    valFields
], updateOneOrder);

router.post('/', [
    check('quantity', 'No es un valor valido').isNumeric(),
    check('price', 'No es un valor valido').isNumeric(),
    check('state_id', 'No es un valor valido').isNumeric(),
    check('state_id').custom( stateExistingId ),
    check('date', 'No es una fecha valida').isDate(),
    check('products').custom(getProductsExisting),
    valFields
], createNewOrder);

router.delete('/:id',  [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId),
    valFields
],deleteOneOrder);



module.exports = router;