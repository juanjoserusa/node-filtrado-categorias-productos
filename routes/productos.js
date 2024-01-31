
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { crearProducto, obtenerProducto,obtenerProductos,borrarProducto,actualizarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router()


// Obtener todas las producto - publico
router.get('/', obtenerProductos);

// Obtener una las producto - publico
router.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

// Crear una nueva producto - privado pero cualquier rol
router.post('/',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'no es un id de monog valido para la categoria').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

// Actualizar una producto - privado paro cualquier rol
router.put('/:id',[
    validarJWT,
    check('id').custom( existeProductoPorId ),
    // check('categoria', 'No es un id de mongo').isMongoId(),
    validarCampos
],actualizarProducto);

// Crear un nueva producto - privado solo admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos


],borrarProducto);





module.exports = router