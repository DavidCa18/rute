var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {

  verificacionUsuario: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT "
      + " conductor.idConductor, "
      + " conductor.identificacion, "
      + " conductor.nombre, "
      + " conductor.telefono, "
      + " conductor.direccion, "
      + " conductor.foto, "
      + " conductor.estado, "
      + " usuario.idUsuario, "
      + " usuario.email, "
      + " usuario.rol "
      + " FROM "
      + " usuario "
      + " INNER JOIN conductor ON conductor.idUsuario = usuario.idUsuario WHERE usuario.email = ? AND usuario.password = ?",
      [req.body.email, req.body.password], function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(data);
          db.end();
        }
      });
  },

  verificacionUsuarioRepresentante: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT "
      + " usuario.idUsuario, "
      + " usuario.email, "
      + " usuario.rol, "
      + " representante.idRepresentante, "
      + " representante.identificacion, "
      + " representante.nombre, "
      + " representante.telefono, "
      + " representante.foto "
      + " FROM "
      + " usuario "
      + " INNER JOIN representante ON representante.idUsuario = usuario.idUsuario "
      + " WHERE "
      + " usuario.email = ? AND "
      + " usuario.password = ?",
      [req.body.email, req.body.password], function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(data);
          db.end();
        }
      });
  },

  guardarUsuario: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`usuario`(`email`, `password`, `rol`) VALUES (?,?,?)",
      [req.body.email, req.body.password, req.body.rol],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(true);
          db.end();
        }
      }
    );
  },

  modificarUsuario: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `rute`.`usuario` SET `email` = ?, `password` = ?, `rol` = ? WHERE `idUsuario` = ?",
      [req.body.email, req.body.password, req.body.rol, req.body.idUsuario],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(true);
          db.end();
        }
      }
    );
  },

  eliminarUsuario: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`usuario` WHERE `idUsuario` = ?",
      [req.body.idUsuario],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(true);
          db.end();
        }
      }
    );
  },

  buscarUsuario: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT * FROM usuario", function (err, data, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        db.end();
      } else {
        res.send(data);
        db.end();
      }
    });
  },

  buscarUsuarioComboConductor: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT idUsuario AS 'value', email AS 'text' FROM usuario WHERE rol = 'CONDUCTOR'",
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(data);
          db.end();
        }
      }
    );
  },

  buscarUsuarioComboRepresentante: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT idUsuario AS 'value', email AS 'text' FROM usuario WHERE rol = 'REPRESENTANTE'",
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          res.send(data);
          db.end();
        }
      }
    );
  },

  buscarInicioResumen: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(`SELECT CONVERT(
      CONCAT(
      '{"conductor":',
      (SELECT
      Count(conductor.idConductor)
      FROM
      conductor
      ),
      ',"estudiante":',
      (SELECT
      Count(estudiante.idEstudiante)
      FROM
      estudiante),
      ',"representante":',
      (SELECT
      Count(representante.idRepresentante)
      FROM
      representante),
      ',"vehiculo":',
      (SELECT
      Count(vehiculo.idVehiculo)
      FROM
      vehiculo),
      '}'
      )
      , VARCHAR(1000)) AS 'inicio'`, function (err, data, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        db.end();
      } else {
        res.send(data);
        db.end();
      }
    });
  },
};
