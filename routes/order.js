const { Router } = require('express');


const { check } = require('express-validator');

const {
    valFields, 
} = require('../middlewares');
const { orderExistingId, stateExistingId} = require('../helpers/db-validator');



const { getAllOrders,
        getOneOrder,
        createNewOrder,
        updateOneOrder,
        deleteOneOrder } = require('../controllers/orderController');


const router = Router();

router.get('/', getAllOrders);

router.get('/:id', [
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId ),
    valFields
], getOneOrder);



router.put('/:id', [
   
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId ),
    check('quantity', 'No es un valor valido').isNumeric(),
    check('price', 'No es un valor valido').isNumeric(),
    check('state_id', 'No es un valor valido').isNumeric(),
    check('state_id').custom( stateExistingId ),
    check('date', 'No es una fecha valida').isDate(),

    // check('id_matr', 'id_curso').custom(courseValidator),
    valFields
], updateOneOrder);

router.post('/', [
  
    check('quantity', 'No es un valor valido').isNumeric(),
    check('price', 'No es un valor valido').isNumeric(),
    check('state_id', 'No es un valor valido').isNumeric(),
    check('state_id').custom( stateExistingId ),
    check('date', 'No es una fecha valida').isDate(),
    // check('id_matr', 'id_curso').custom(courseValidator),
    valFields
], createNewOrder);

router.delete('/:id',  [
  
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( orderExistingId),
    valFields
],deleteOneOrder);

module.exports = router;