const { Router } = require('express');
const { check } = require('express-validator');

const {
    valFields,
    validateFileUpload
} = require('../middlewares');

const { productExistingId, typeExistingId, productValidator } = require('../helpers/db-validator');

const { getAllProducts,
        getOneProduct,
        createNewProduct,
        updateOneProduct,
        deleteOneProduct } = require('../controllers/productController');


const router = Router();

router.get('/', getAllProducts);

router.get('/:id' , [
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( productExistingId ),
    valFields
], getOneProduct);

router.put('/:id', [
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( productExistingId ),
    check('name', 'The name is required').not().isEmpty(),
    check('type_id', 'Is not a valid id').isNumeric(),
    check('type_id', 'The type id is required').not().isEmpty(),
    check('type_id').custom( typeExistingId ),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('quantity', 'The quantity must be a number').isNumeric(),
    check('price', 'The price is required').not().isEmpty(),
    check('price', 'The price must be a number').isNumeric(),
    check('description', 'The description is required').not().isEmpty(),
    valFields
], updateOneProduct);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('name').custom ( productValidator ),
    check('type_id', 'Is not a valid id').isNumeric(),
    check('type_id', 'The type id is required').not().isEmpty(),
    check('type_id').custom( typeExistingId ),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('quantity', 'The quantity must be a number').isNumeric(),
    check('price', 'The price is required').not().isEmpty(),
    check('price', 'The price must be a number').isNumeric(),
    check('description', 'The description is required').not().isEmpty(),
    validateFileUpload,
    valFields
], createNewProduct);

router.delete('/:id', [
    check('id', 'Is not a valid id').isNumeric(),
    check('id').custom( productExistingId ),
    valFields
], deleteOneProduct);

module.exports = router;