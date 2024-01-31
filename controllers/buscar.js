const { response } = require("express")
const { isValidObjectId } = require('mongoose')
const { Usuarios, Categoria, Producto } = require('../models')


const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino='', res) => {

    const esMongoId = isValidObjectId(termino)

    if( esMongoId ) {
        const usuario = await Usuarios.findById(termino)
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regexp = new RegExp(termino, 'i')

    const usuarios = await Usuarios.find({ 
        $or:[{ nombre:regexp },{ correo:regexp }],
        $and: [{estado:true}]
     });


    res.json({
        results: usuarios
    });



}


const buscarCategorias = async(termino='', res) => {

    const esMongoId = isValidObjectId(termino)

    if( esMongoId ) {
        const categoria = await Categoria.findById(termino)
        res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regexp = new RegExp(termino, 'i')

    const categorias = await Categoria.find({ 
        $or:[{ nombre:regexp }],
        $and: [{estado:true}]
     }).populate('usuario','nombre');


    res.json({
        results: categorias
    });



}

const buscarProducto = async(termino='', res) => {

    const esMongoId = isValidObjectId(termino)

    if( esMongoId ) {
        const producto = await Producto.findById(termino)
        res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regexp = new RegExp(termino, 'i')

    const productos = await Producto.find({ 
        $or:[{ nombre:regexp }],
        $and: [{estado:true}]
     }).populate('usuario','nombre').populate('categoria','nombre');


    res.json({
        results: productos
    });



}

const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)
            break
        case 'usuarios':
            buscarUsuarios(termino, res)
            break
        case 'productos':
            buscarProducto(termino, res)
            break
        default:
            res.status(500).json({
                msg: 'se me olvido hacer esta busqueda'
            })
            
    }

}


module.exports= {
    buscar
}