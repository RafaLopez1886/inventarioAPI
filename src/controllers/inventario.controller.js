import { datosConexion } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Resto de tu código

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const autenticarUsuario = async (req, res) => {
  try {
    const { ueq_email, ueq_contrasena } = req.body;

    const [filas] = await datosConexion.query(
      "SELECT * FROM usuariosequipo WHERE ueq_email = ?",
      [ueq_email]
    );

    if (filas.length !== 0) {
      const usuario = filas[0];
      const passwordMatch = bcrypt.compareSync(
        ueq_contrasena,
        usuario.ueq_contrasena
      );
      if (passwordMatch) {
        // Generar el token JWT
        const idToken = filas[0].ueq_idUsuariosEquipo;
        const rolToken = filas[0].ueq_rol;
        console.log(idToken, " ", rolToken);
        const token = jwt.sign({ id: idToken, role: rolToken }, jwtSecret, {
          expiresIn: "1h",
        });
        console.log(filas[0].ueq_rol);
        console.log("Token:", token);
        res
          .status(200)
          .json({
            message: "Correo encontrado / Contraseña verificada",
            token,
          });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    } else {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//Query para obtener datos de inventario
/*
export const getInventario = async (req, res) => {
    
    const [filas] = await datosConexion.query('SELECT ieq_idRegInventario, ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, DATE_FORMAT(ieq_fechaCompra, "%d-%m-%Y") AS ieq_fechaCompra, ieq_precio, usuariosequipo.ueq_nombre, marcaequipo.meq_nombre, estadoequipo.eeq_nombre, tipoequipo.teq_nombre FROM inventario INNER JOIN usuariosequipo ON inventario.fk_ieq_usuarioACargo = usuariosequipo.ueq_idUsuariosEquipo INNER JOIN marcaequipo ON inventario.fk_ieq_marcaNombre = marcaequipo.meq_idMarcaEquipo INNER JOIN estadoequipo ON inventario.fk_ieq_estadoEquipo = estadoequipo.eeq_idEstadoEquipo INNER JOIN tipoequipo ON inventario.fk_ieq_tipoEquipo = tipoequipo.teq_idTipoEquipo ORDER BY ieq_idRegInventario ASC');
    res.json(filas);

}
*/

export const getInventario = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Docente" || role === "Administrador") {
      const [filas] = await datosConexion.query(
        'SELECT ieq_idRegInventario, ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, DATE_FORMAT(ieq_fechaCompra, "%d-%m-%Y") AS ieq_fechaCompra, ieq_precio, usuariosequipo.ueq_nombre, marcaequipo.meq_nombre, estadoequipo.eeq_nombre, tipoequipo.teq_nombre FROM inventario INNER JOIN usuariosequipo ON inventario.fk_ieq_usuarioACargo = usuariosequipo.ueq_idUsuariosEquipo INNER JOIN marcaequipo ON inventario.fk_ieq_marcaNombre = marcaequipo.meq_idMarcaEquipo INNER JOIN estadoequipo ON inventario.fk_ieq_estadoEquipo = estadoequipo.eeq_idEstadoEquipo INNER JOIN tipoequipo ON inventario.fk_ieq_tipoEquipo = tipoequipo.teq_idTipoEquipo ORDER BY ieq_idRegInventario ASC'
      );
      res.json(filas);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const [filas] = await datosConexion.query("SELECT * FROM usuariosequipo");
      res.json(filas);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//Queries para insertar datos/crear nuevos registros

export const postInventario = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const {
        ieq_serial,
        ieq_modelo,
        ieq_descripcion,
        ieq_urlImagen,
        ieq_color,
        ieq_fechaCompra,
        ieq_precio,
        fk_ieq_usuarioACargo,
        fk_ieq_marcaNombre,
        fk_ieq_estadoEquipo,
        fk_ieq_tipoEquipo,
      } = req.body;
      const [filas] = await datosConexion.query(
        "INSERT INTO inventario (ieq_serial, ieq_modelo, ieq_descripcion, ieq_urlImagen, ieq_color, ieq_fechaCompra, ieq_precio, fk_ieq_usuarioACargo, fk_ieq_marcaNombre, fk_ieq_estadoEquipo, fk_ieq_tipoEquipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          ieq_serial,
          ieq_modelo,
          ieq_descripcion,
          ieq_urlImagen,
          ieq_color,
          ieq_fechaCompra,
          ieq_precio,
          fk_ieq_usuarioACargo,
          fk_ieq_marcaNombre,
          fk_ieq_estadoEquipo,
          fk_ieq_tipoEquipo,
        ]
      );

      console.log(req.body);
      res.send({ filas });
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const postEstadoEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const {
        eeq_nombre,
        eeq_estado,
        eeq_fechaCreacion,
        eeq_fechaActualizacion,
      } = req.body;
      const [filas] = await datosConexion.query(
        "INSERT INTO estadoequipo (eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion) VALUES (?,?,?,?)",
        [eeq_nombre, eeq_estado, eeq_fechaCreacion, eeq_fechaActualizacion]
      );

      console.log(req.body);
      res.send({ filas });
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const postMarcaEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const {
        meq_nombre,
        meq_estado,
        meq_fechaCreacion,
        meq_fechaActualizacion,
      } = req.body;
      const [filas] = await datosConexion.query(
        "INSERT INTO marcaequipo (meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion) VALUES (?,?,?,?)",
        [meq_nombre, meq_estado, meq_fechaCreacion, meq_fechaActualizacion]
      );

      console.log(req.body);
      res.send({ filas });
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const postTipoEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const {
        teq_nombre,
        teq_estado,
        teq_fechaCreacion,
        teq_fechaActualizacion,
      } = req.body;
      const [filas] = await datosConexion.query(
        "INSERT INTO tipoequipo (teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion) VALUES (?,?,?,?)",
        [teq_nombre, teq_estado, teq_fechaCreacion, teq_fechaActualizacion]
      );

      console.log(req.body);
      res.send({ filas });
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const postUsuariosEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const {
        ueq_nombre,
        ueq_email,
        ueq_estado,
        ueq_rol,
        ueq_contrasena,
        ueq_fechaCreacion,
        ueq_fechaActualizacion,
      } = req.body;

      //Validación de rol
      if (ueq_rol !== "Administrador" && ueq_rol !== "Docente") {
        res
          .status(400)
          .send("El campo Rol sólo admite 'Administrador' o 'Docente'");
        return;
      }

      //Encriptación de contraseña
      const hashedPassword = bcrypt.hashSync(ueq_contrasena, 10);
      const [filas] = await datosConexion.query(
        "INSERT INTO usuariosequipo (ueq_nombre, ueq_email, ueq_estado, ueq_rol, ueq_contrasena, ueq_fechaCreacion, ueq_fechaActualizacion) VALUES (?,?,?,?,?,?,?)",
        [
          ueq_nombre,
          ueq_email,
          ueq_estado,
          ueq_rol,
          hashedPassword,
          ueq_fechaCreacion,
          ueq_fechaActualizacion,
        ]
      );
      const contraseñaComparar = req.body.ueq_contrasena;

      //Comparación de contraseñas (insertada vs encriptada)
      const passwordMatch = bcrypt.compareSync(
        contraseñaComparar,
        hashedPassword
      );

      if (passwordMatch) {
        console.log(
          "La contraseña de usuario ingresada coincide con la encriptación insertada"
        );
      } else {
        console.log(
          "La contraseña de usuario ingresada NO coincide con la encriptación insertada"
        );
      }

      console.log(req.body);
      res.send({ filas });
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//Queries para actualizar datos

export const updateInventario = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const { ieq_idRegInventario } = req.params;
      console.log(ieq_idRegInventario);

      const {
        ieq_serial,
        ieq_modelo,
        ieq_descripcion,
        ieq_urlImagen,
        ieq_color,
        ieq_fechaCompra,
        ieq_precio,
        fk_ieq_usuarioACargo,
        fk_ieq_marcaNombre,
        fk_ieq_estadoEquipo,
        fk_ieq_tipoEquipo,
      } = req.body;

      const [result] = await datosConexion.query(
        "UPDATE inventario SET ieq_serial = IFNULL(?, ieq_serial), ieq_modelo = IFNULL(?, ieq_modelo), ieq_descripcion = IFNULL(?, ieq_descripcion), ieq_urlImagen = IFNULL(?, ieq_urlImagen), ieq_color = IFNULL(?, ieq_color),ieq_fechaCompra =IFNULL(?, ieq_fechaCompra),ieq_precio =IFNULL(?, ieq_precio),fk_ieq_usuarioACargo =IFNULL(?, fk_ieq_usuarioACargo),fk_ieq_marcaNombre =IFNULL(?, fk_ieq_marcaNombre),fk_ieq_estadoEquipo =IFNULL(?, fk_ieq_estadoEquipo),fk_ieq_tipoEquipo = IFNULL(?, fk_ieq_tipoEquipo) WHERE ieq_idRegInventario = ?",

        [
          ieq_serial,
          ieq_modelo,
          ieq_descripcion,
          ieq_urlImagen,
          ieq_color,
          ieq_fechaCompra,
          ieq_precio,
          fk_ieq_usuarioACargo,
          fk_ieq_marcaNombre,
          fk_ieq_estadoEquipo,
          fk_ieq_tipoEquipo,
          ieq_idRegInventario,
        ]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });

      const [filas] = await datosConexion.query(
        "SELECT * FROM inventario WHERE ieq_idRegInventario = ?",
        [ieq_idRegInventario]
      );

      res.json(filas[0]);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Ups, algo salió mal" });
  }
};

export const updateEstadoequipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const { eeq_idEstadoEquipo } = req.params;
      console.log(eeq_idEstadoEquipo);

      const {
        eeq_nombre,
        eeq_estado,
        eeq_fechaCreacion,
        eeq_fechaActualizacion,
      } = req.body;

      const [result] = await datosConexion.query(
        "UPDATE estadoequipo SET eeq_nombre = IFNULL(?, eeq_nombre), eeq_estado = IFNULL(?, eeq_estado), eeq_fechaCreacion = IFNULL(?, eeq_fechaCreacion), eeq_fechaActualizacion = IFNULL(?, eeq_fechaActualizacion) WHERE eeq_idEstadoEquipo = ?",

        [
          eeq_nombre,
          eeq_estado,
          eeq_fechaCreacion,
          eeq_fechaActualizacion,
          eeq_idEstadoEquipo,
        ]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });

      const [filas] = await datosConexion.query(
        "SELECT * FROM estadoequipo WHERE eeq_idEstadoEquipo = ?",
        [eeq_idEstadoEquipo]
      );

      res.json(filas[0]);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Ups, algo salió mal" });
  }
};
export const updateMarcaEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const { meq_idMarcaEquipo } = req.params;
      console.log(meq_idMarcaEquipo);

      const {
        meq_nombre,
        meq_estado,
        meq_fechaCreacion,
        meq_fechaActualizacion,
      } = req.body;

      const [result] = await datosConexion.query(
        "UPDATE marcaequipo SET meq_nombre = IFNULL(?, meq_nombre), meq_estado = IFNULL(?, meq_estado), meq_fechaCreacion = IFNULL(?, meq_fechaCreacion), meq_fechaActualizacion = IFNULL(?, meq_fechaActualizacion) WHERE meq_idMarcaEquipo= ?",

        [
          meq_nombre,
          meq_estado,
          meq_fechaCreacion,
          meq_fechaActualizacion,
          meq_idMarcaEquipo,
        ]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });

      const [filas] = await datosConexion.query(
        "SELECT * FROM marcaequipo WHERE meq_idMarcaEquipo = ?",
        [meq_idMarcaEquipo]
      );

      res.json(filas[0]);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Ups, algo salió mal" });
  }
};
export const updateUsuariosEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      
      const { ueq_idUsuariosEquipo } = req.params;
      console.log(ueq_idUsuariosEquipo);

      const {
        ueq_nombre,
        ueq_email,
        ueq_estado,
        ueq_rol,
        ueq_contrasena,
        ueq_fechaCreacion,
        ueq_fechaActualizacion,
      } = req.body;

      console.log(ueq_contrasena)

      let hashedPassword= ""

      if(typeof ueq_contrasena !== 'undefined'){
        hashedPassword = bcrypt.hashSync(ueq_contrasena, 10);
      } else {
        hashedPassword=ueq_contrasena
      }

      const [result] = await datosConexion.query(
        "UPDATE usuariosequipo SET ueq_nombre = IFNULL(?, ueq_nombre), ueq_email = IFNULL(?, ueq_email), ueq_estado = IFNULL(?, ueq_estado), ueq_rol= IFNULL(?, ueq_rol), ueq_contrasena= IFNULL(?, ueq_contrasena), ueq_fechaCreacion = IFNULL(?, ueq_fechaCreacion), ueq_fechaActualizacion = IFNULL(?, ueq_fechaActualizacion)  WHERE ueq_idUsuariosEquipo= ?",

        [
          ueq_nombre,
          ueq_email,
          ueq_estado,
          ueq_rol,
          hashedPassword,
          ueq_fechaCreacion,
          ueq_fechaActualizacion,
          ueq_idUsuariosEquipo,
        ]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });

      const [filas] = await datosConexion.query(
        "SELECT * FROM usuariosequipo WHERE ueq_idUsuariosEquipo = ?",
        [ueq_idUsuariosEquipo]
      );

      res.json(filas[0]);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Ups, algo salió mal" });
  }

};

export const updateTipoEquipo = async (req, res) => {
  try {
    // Verificar el rol del usuario
    const { role } = req.user;

    if (role === "Administrador") {
      const { teq_idTipoEquipo } = req.params;
      console.log(teq_idTipoEquipo);

      const {
        teq_nombre,
        teq_estado,
        teq_fechaCreacion,
        teq_fechaActualizacion,
      } = req.body;

      const [result] = await datosConexion.query(
        "UPDATE tipoequipo SET teq_nombre = IFNULL(?, teq_nombre), teq_estado = IFNULL(?, teq_estado), teq_fechaCreacion = IFNULL(?, teq_fechaCreacion), teq_fechaActualizacion = IFNULL(?, teq_fechaActualizacion) WHERE teq_idTipoEquipo= ?",

        [
          teq_nombre,
          teq_estado,
          teq_fechaCreacion,
          teq_fechaActualizacion,
          teq_idTipoEquipo,
        ]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro no encontrado" });

      const [filas] = await datosConexion.query(
        "SELECT * FROM tipoequipo WHERE teq_idTipoEquipo = ?",
        [teq_idTipoEquipo]
      );

      res.json(filas[0]);
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Ups, algo salió mal" });
  }
};
