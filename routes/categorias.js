
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()


// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get');
});

// Obtener una las categorias - publico
router.get('/:id', (req, res) => {
    res.json('get - id');
});

// Crear una nueva categorias - privado pero cualquier rol
router.post('/', (req, res) => {
    res.json('post');
});

// Actualizar una categoria - privado paro cualquier rol
router.put('/:id', (req, res) => {
    res.json('put');
});

// Crear una nueva categorias - privado solo admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});





module.exports = router