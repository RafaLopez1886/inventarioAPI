console.log("Hello World!"); //Prueba de ejecución desde Node
import express from "express"; //Express permite el trabajo de comunicación entre servicios con módulos
import inventarioRuta from './routes/inventario.routes.js' //Importamos rurtas de Inventario
import {pong} from './controllers/index.controller.js'

const inventario = express();

//Aquí se prueba conexión a server local

inventario.get('/ping', pong);

inventario.use(express.json())

inventario.use(inventarioRuta)//Llamamos las rutas de Inventario

inventario.listen(3000);//Se establece el puerto por el que el servidor Node va a escuchar


