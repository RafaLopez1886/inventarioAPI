import {datosConexion} from '../db.js' //Importamos el objeto para conexión con base de datos

export const pong = async (req, res) => {
    //Se define una función asíncrona que tiene la Promesa de recibir data del server
    const [resultadoPrueba]= await datosConexion.query('SELECT "Pong" as resultadoPrueba')
   res.json(resultadoPrueba)
}
