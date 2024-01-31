
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router()


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una las categorias - publico
router.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],obtenerCategoria);

// Crear una nueva categorias - privado pero cualquier rol
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria);

// Actualizar una categoria - privado paro cualquier rol
router.put('/:id',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria);

// Crear una nueva categorias - privado solo admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos


], borrarCategoria);





module.exports = router