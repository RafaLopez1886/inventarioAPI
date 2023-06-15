//Aquí se crean las rutas de módulo Inventario

import { Router } from "express";

import { authenticateToken, checkRole } from '../controllers/middleware.js';

import cors from "cors";

import {autenticarUsuario, getInventario, getUsuarios, postInventario,postEstadoEquipo, postMarcaEquipo, postTipoEquipo, 
    postUsuariosEquipo, updateInventario, updateEstadoequipo, updateMarcaEquipo, updateUsuariosEquipo, updateTipoEquipo} from '../controllers/inventario.controller.js'

const enrutador = Router();

//const cors = require('cors')

enrutador.use(cors())

enrutador.get('/login', autenticarUsuario)

enrutador.get('/inventarioget', authenticateToken, checkRole(['Docente', 'Administrador']), getInventario);
enrutador.get('/usuariosget', authenticateToken, checkRole(['Administrador']), getUsuarios)

//Rutas para envío de datos a BBDD
enrutador.post('/inventariopost', authenticateToken, checkRole(['Administrador']), postInventario)
enrutador.post('/estadopost', authenticateToken, checkRole(['Administrador']), postEstadoEquipo)
enrutador.post('/marcapost', authenticateToken, checkRole(['Administrador']), postMarcaEquipo)
enrutador.post('/tipopost', authenticateToken, checkRole(['Administrador']), postTipoEquipo)
enrutador.post('/usuariosequipo', authenticateToken, checkRole(['Administrador']), postUsuariosEquipo)

//Rutas para actualización de datos a BBDD
enrutador.patch('/inventariopatch/:ieq_idRegInventario', authenticateToken, checkRole(['Administrador']), updateInventario)
enrutador.patch('/estadoequipopatch/:eeq_idEstadoEquipo', authenticateToken, checkRole(['Administrador']), updateEstadoequipo)
enrutador.patch('/marcaequipopatch/:meq_idMarcaEquipo', authenticateToken, checkRole(['Administrador']), updateMarcaEquipo)
enrutador.patch('/usuarioequipopatch/:ueq_idUsuariosEquipo', authenticateToken, checkRole(['Administrador']), updateUsuariosEquipo)
enrutador.patch('/tipoequipopatch/:teq_idTipoEquipo', authenticateToken, checkRole(['Administrador']), updateTipoEquipo)



export default enrutador    