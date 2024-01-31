const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const Usuarios = require ('../models/usuario')


const existeEmail = async(correo = '') => {
    
    const existeEmail = await Usuarios.findOne({correo})
    
    if ( existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const esRolValido = async(rol = '') => {
    const existerol = await Role.findOne({ rol });
    if ( !existerol){
        throw new Error(`el Rol ${rol} no está registrado en la base de datos`)
    }
}

const existeUsuarioPorID = async(id = '') => {
    
    const existeUser = await Usuarios.findById(id)
    if ( !existeUser){
        throw new Error(`El usuario con id = ${id} no existe`)
    }
}

const existeCategoriaPorId = async(id = '') => {
    
    const existeCategoria = await Categoria.findById(id)
    if ( !existeCategoria){
        throw new Error(`La categoria con id = ${id} no existe`)
    }
}

const existeProductoPorId = async(id = '') => {
    
    const existeProducto = await Producto.findById(id)
    if ( !existeProducto){
        throw new Error(`La producto con id = ${id} no existe`)
    }
}


module.exports={
    esRolValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaPorId,
    existeProductoPorId
}


