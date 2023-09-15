var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
  guardarUsuarioConductor: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`usuario`(`email`, `password`, `rol`) VALUES (?,?,?)",
      [req.body.email, req.body.password, 'CONDUCTOR'],
      function(err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {

          var idUsuario = data.insertId;

          db.query(
            "INSERT INTO `rute`.`conductor`(`identificacion`, `nombre`, `telefono`, `direccion`, `foto`, `idUsuario`, `estado`) VALUES (?,?,?,?,?,?,?)",
            [
              req.body.identificacion,
              req.body.nombre,
              req.body.telefono,
              req.body.direccion,
              req.body.foto,
              idUsuario,
              "1"
            ],
            function(err, data, fields) {
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
        }
      }
    );
  },

  guardarConductor: function(req, res_, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`usuario`(`email`, `password`, `rol`) VALUES (?,?,?)",
      [req.body.email, req.body.identificacion, 'CONDUCTOR'],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res_.sendStatus(500);
          db.end();
        } else {
          db.end();
          var res = data;
          var idUsuario = res.insertId;

          var db2 = mysql.createConnection(config);
          db2.connect();
      
          db2.query(
            "INSERT INTO `rute`.`conductor`(`identificacion`, `nombre`, `telefono`, `direccion`, `foto`, `idUsuario`, `estado`) VALUES (?,?,?,?,?,?,?)",
            [
              req.body.identificacion,
              req.body.nombre,
              req.body.telefono,
              req.body.direccion,
              req.body.foto,
              idUsuario,
              1
            ],
            function(err, data, fields) {
              if (err) {
                console.log(err);
                res_.sendStatus(500);
                db2.end();
              } else {
                res_.send(true);
                db2.end();
              }
            }
          );

        }
      }
    );
  },

  modificarConductor: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `conductor` SET `identificacion` = ?, `nombre` = ?, `telefono` = ?, `direccion` = ?, `foto` = ?, `idUsuario` = ?, `estado` = ? WHERE `idConductor` = ?",
      [
        req.body.identificacion,
        req.body.nombre,
        req.body.telefono,
        req.body.direccion,
        req.body.foto,
        req.body.idUsuario,
        req.body.estado,
        req.body.idConductor
      ],
      function(err, data, fields) {
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

  eliminarConductor: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`conductor` WHERE `idConductor` = ?",
      [req.body.idConductor],
      function(err, data, fields) {
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

  buscarConductor: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(`SELECT
    *
    FROM
    conductor
    INNER JOIN usuario ON conductor.idUsuario = usuario.idUsuario`, function(err, data, fields) {
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

  buscarConductorCombo: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT conductor.idConductor AS 'value', conductor.nombre AS 'text' FROM conductor", function(err, data, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        db.end();
      } else {
        res.send(data);
        db.end();
      }
    });
  }
};
