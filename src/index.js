console.log("Hello World!"); //Prueba de ejecución desde Node
import express from "express"; //Express permite el trabajo de comunicación entre servicios con módulos
import inventarioRuta from './routes/inventario.routes.js' //Importamos rurtas de Inventario
import {pong} from './controllers/index.controller.js'
import cors from "cors";
const allowedOrigins = ['http://localhost:3000'];

import {PORT} from'./config.js'

//const cors = require('cors')

const inventario = express();

inventario.get('/ping', pong); //Aquí se prueba conexión a server local

inventario.use(express.json())

inventario.use(inventarioRuta)//Llamamos las rutas de Inventario


inventario.listen(PORT);//Se establece el puerto por el que el servidor Node va a escuchar


