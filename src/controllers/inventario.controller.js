import {datosConexion} from '../db.js'

//Query para obtener datos de inventario
export const getInventario = async (req, res) => {
    
    const [filas] = await datosConexion.query('SELECT * FROM inventario');
    res.json(filas);

}

//Queries para insertar datos/crear nuevos registros

export const postInventario = async (req, res) => {
    const {ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, ieq_fechaCompra, ieq_precio, fk_ieq_usuarioACargo, fk_ieq_marcaNombre, fk_ieq_estadoEquipo, fk_ieq_tipoEquipo} = req.body
    const [filas] = await datosConexion.query('INSERT INTO inventario (ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, ieq_fechaCompra, ieq_precio, fk_ieq_usuarioACargo, fk_ieq_marcaNombre, fk_ieq_estadoEquipo, fk_ieq_tipoEquipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, ieq_fechaCompra, ieq_precio, fk_ieq_usuarioACargo, fk_ieq_marcaNombre, fk_ieq_estadoEquipo, fk_ieq_tipoEquipo])

    console.log(req.body)
    res.send({filas})
}
export const postEstadoEquipo = async (req, res) => {
    const {eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion} = req.body
    const [filas] = await datosConexion.query('INSERT INTO estadoequipo (eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion) VALUES (?,?,?,?)', [eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion])

    console.log(req.body)
    res.send({filas})
    
}
export const postMarcaEquipo = async (req, res) => {
    const {meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion} = req.body
    const [filas] = await datosConexion.query('INSERT INTO marcaequipo (meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion) VALUES (?,?,?,?)', [meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion])

    console.log(req.body)
    res.send({filas})
    
}
export const postTipoEquipo = async (req, res) => {
    const {teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion} = req.body
    const [filas] = await datosConexion.query('INSERT INTO tipoequipo (teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion) VALUES (?,?,?,?)', [teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion])

    console.log(req.body)
    res.send({filas})
    
}
export const postUsuariosEquipo = async (req, res) => {
    const {ueq_nombre, ueq_email, ueq_estado, ueq_fechaCreacion, ueq_fechaActualizacion} = req.body
    const [filas] = await datosConexion.query('INSERT INTO usuariosequipo (ueq_nombre, ueq_email, ueq_estado, ueq_fechaCreacion, ueq_fechaActualizacion) VALUES (?,?,?,?,?)', [ueq_nombre, ueq_email, ueq_estado, ueq_fechaCreacion, ueq_fechaActualizacion])

    console.log(req.body)
    res.send({filas})
    
}


//Queries para actualizar datos

export const updateInventario = async (req, res) => {
    try {
      const { ieq_idRegInventario } = req.params;
      console.log(ieq_idRegInventario);

      const { ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, ieq_fechaCompra, ieq_precio, fk_ieq_usuarioACargo, fk_ieq_marcaNombre, fk_ieq_estadoEquipo, fk_ieq_tipoEquipo } = req.body;
  
      const [result] = await datosConexion.query(
        "UPDATE inventario SET ieq_serial = IFNULL(?, ieq_serial), ieq_modelo = IFNULL(?, ieq_modelo), ieq_descripcion = IFNULL(?, ieq_descripcion), ieq_urlImagen = IFNULL(?, ieq_urlImagen), ieq_color = IFNULL(?, ieq_color),ieq_fechaCompra =IFNULL(?, ieq_fechaCompra),ieq_precio =IFNULL(?, ieq_precio),fk_ieq_usuarioACargo =IFNULL(?, fk_ieq_usuarioACargo),fk_ieq_marcaNombre =IFNULL(?, fk_ieq_marcaNombre),fk_ieq_estadoEquipo =IFNULL(?, fk_ieq_estadoEquipo),fk_ieq_tipoEquipo = IFNULL(?, fk_ieq_tipoEquipo) WHERE ieq_idRegInventario = ?",

        [ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, ieq_fechaCompra, ieq_precio, fk_ieq_usuarioACargo, fk_ieq_marcaNombre, fk_ieq_estadoEquipo, fk_ieq_tipoEquipo, ieq_idRegInventario]

      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });
  
      const [filas] = await datosConexion.query("SELECT * FROM inventario WHERE ieq_idRegInventario = ?", [
        ieq_idRegInventario,
      ]);
  
      res.json(filas[0]);
    
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
      }

  };
  export const updateEstadoequipo = async (req, res) => {
    try {
      const { eeq_idEstadoEquipo } = req.params;
      console.log(eeq_idEstadoEquipo);

      const { eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion} = req.body;
  
      const [result] = await datosConexion.query(
        "UPDATE estadoequipo SET eeq_nombre = IFNULL(?, eeq_nombre), eeq_estado = IFNULL(?, eeq_estado), eeq_fechaCreacion = IFNULL(?, eeq_fechaCreacion), eeq_fechaActualizacion = IFNULL(?, eeq_fechaActualizacion) WHERE eeq_idEstadoEquipo = ?",

        [eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion, eeq_idEstadoEquipo]

      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });
  
      const [filas] = await datosConexion.query("SELECT * FROM estadoequipo WHERE eeq_idEstadoEquipo = ?", [
        eeq_idEstadoEquipo,
      ]);
  
      res.json(filas[0]);
    
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
      }

  };
  export const updateMarcaEquipo = async (req, res) => {
    try {
      const { meq_idMarcaEquipo } = req.params;
      console.log(meq_idMarcaEquipo);

      const { meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion} = req.body;
  
      const [result] = await datosConexion.query(
        "UPDATE marcaequipo SET meq_nombre = IFNULL(?, meq_nombre), meq_estado = IFNULL(?, meq_estado), meq_fechaCreacion = IFNULL(?, meq_fechaCreacion), meq_fechaActualizacion = IFNULL(?, meq_fechaActualizacion) WHERE meq_idMarcaEquipo= ?",

        [meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion, meq_idMarcaEquipo]

      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });
  
      const [filas] = await datosConexion.query("SELECT * FROM marcaequipo WHERE meq_idMarcaEquipo = ?", [
        meq_idMarcaEquipo,
      ]);
  
      res.json(filas[0]);
    
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
      }

  };
  export const updateUsuariosEquipo = async (req, res) => {
    try {
      const { ueq_idUsuariosEquipo } = req.params;
      console.log(ueq_idUsuariosEquipo);

      const { ueq_nombre, ueq_email, ueq_estado, ueq_fechaCreacion, ueq_fechaActualizacion} = req.body;
  
      const [result] = await datosConexion.query(
        "UPDATE usuariosequipo SET ueq_nombre = IFNULL(?, ueq_nombre), ueq_email = IFNULL(?, ueq_email), ueq_estado = IFNULL(?, ueq_estado), ueq_fechaCreacion = IFNULL(?, ueq_fechaCreacion), ueq_fechaActualizacion = IFNULL(?, ueq_fechaActualizacion)  WHERE ueq_idUsuariosEquipo= ?",

        [ueq_nombre, ueq_email, ueq_estado, ueq_fechaCreacion, ueq_fechaActualizacion, ueq_idUsuariosEquipo]

      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });
  
      const [filas] = await datosConexion.query("SELECT * FROM usuariosequipo WHERE ueq_idUsuariosEquipo = ?", [
        ueq_idUsuariosEquipo,
      ]);
  
      res.json(filas[0]);
    
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
      }

  };
  export const updateTipoEquipo = async (req, res) => {
    try {
      const { teq_idTipoEquipo } = req.params;
      console.log(teq_idTipoEquipo);

      const { teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion} = req.body;
  
      const [result] = await datosConexion.query(
        "UPDATE tipoequipo SET teq_nombre = IFNULL(?, teq_nombre), teq_estado = IFNULL(?, teq_estado), teq_fechaCreacion = IFNULL(?, teq_fechaCreacion), teq_fechaActualizacion = IFNULL(?, teq_fechaActualizacion) WHERE teq_idTipoEquipo= ?",

        [teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion, teq_idTipoEquipo]

      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });
  
      const [filas] = await datosConexion.query("SELECT * FROM tipoequipo WHERE teq_idTipoEquipo = ?", [
        teq_idTipoEquipo,
      ]);
  
      res.json(filas[0]);
    
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
      }

  };

