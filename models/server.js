const express = require('express')
const cors = require('cors');
const { route } = require('../routes/usuarios');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios:'/api/usuarios',
            productos: '/api/productos',
            categorias: '/api/categorias',

        }
        

        // Conectar a la base de datos

        this.conectarDb();

        // Middlewares

        this.middlewares();

        // Rutas de mi aplicacion

        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())
        
        // Directorio publico
        this.app.use( express.static('public'))

        
    }

    async conectarDb(){
        await dbConnection();
    }

    routes() {
        // Middleware dee las rutas desde routes/user.js 
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}


module.exports = Server