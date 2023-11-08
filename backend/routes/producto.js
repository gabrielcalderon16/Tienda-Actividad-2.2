const {getProductos, postProductos, putProductos, deleteProductos} = require('../controllers/producto')
const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')

const router = Router()

router.get('/', getProductos)

router.post('/',
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('descripcion','La descripción de retiro es obligatorio').not().isEmpty(),
check('precio','La precio es obligatorio').not().isEmpty(),
check('cantidad','La cantidad es obligatoria').not().isEmpty(),
check('categoria','La categoria es obligatoria').not().isEmpty(),
validarCampos , postProductos)

router.put('/:id', 
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('descripcion','La descripción de retiro es obligatorio').not().isEmpty(),
check('precio','La precio es obligatorio').not().isEmpty(),
check('cantidad','La cantidad es obligatoria').not().isEmpty(),
check('categoria','La categoria es obligatoria').not().isEmpty(),
validarCampos , putProductos)

router.delete('/:id', deleteProductos)

module.exports = router