import {createPool} from 'mysql2/promise' // Importo módulo para conexión a base de datos
import {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_PASSWORD,
    DB_USER
} from './config.js'

//Datos de mi conexión
export const datosConexion = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})