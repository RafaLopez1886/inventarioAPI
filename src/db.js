import {createPool} from 'mysql2/promise' // Importo módulo para conexión a base de datos


//Datos de mi conexión
export const datosConexion = createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    port: 3307,
    database: 'inventario_equipos'
})