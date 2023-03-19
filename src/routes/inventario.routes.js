//Aquí se crean las rutas de módulo Inventario

import { Router } from "express";

import {getInventario, postInventario,postEstadoEquipo, postMarcaEquipo, postTipoEquipo, 
    postUsuariosEquipo, updateInventario, updateEstadoequipo, updateMarcaEquipo, updateUsuariosEquipo, updateTipoEquipo} from '../controllers/inventario.controller.js'

const enrutador = Router();

enrutador.get('/inventarioget', getInventario)

//Rutas para envío de datos a BBDD

enrutador.post('/inventariopost', postInventario)
enrutador.post('/estadopost', postEstadoEquipo)
enrutador.post('/marcapost', postMarcaEquipo)
enrutador.post('/tipopost', postTipoEquipo)
enrutador.post('/usuariosequipo', postUsuariosEquipo)

//Rutas para actualización de datos a BBDD
enrutador.patch('/inventariopatch/:ieq_idRegInventario', updateInventario)
enrutador.patch('/estadoequipopatch/:eeq_idEstadoEquipo', updateEstadoequipo)
enrutador.patch('/marcaequipopatch/:meq_idMarcaEquipo', updateMarcaEquipo)
enrutador.patch('/usuarioequipopatch/:ueq_idUsuariosEquipo', updateUsuariosEquipo)
enrutador.patch('/tipoequipopatch/:teq_idTipoEquipo', updateTipoEquipo)



export default enrutador    