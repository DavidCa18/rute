var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {

  obtenerRutasConductor: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      +" conductor_vehiculo.idConductorVehiculo, "
      +" conductor.idConductor, "
      +" vehiculo.idVehiculo, "
      +" ruta.idRuta, "
      +" ruta.latitud, "
      +" ruta.longitud, "
      +" ruta.periodo "
      +" FROM "
      +" ruta "
      +" INNER JOIN vehiculo ON ruta.idVehiculo = vehiculo.idVehiculo "
      +" INNER JOIN conductor_vehiculo ON conductor_vehiculo.idVehiculo = vehiculo.idVehiculo "
      +" INNER JOIN conductor ON conductor_vehiculo.idConductor = conductor.idConductor "
      +" WHERE "
      +" conductor.idConductor = ? "
      +" AND ruta.periodo = ?",[req.query.idConductor, req.query.periodo],
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
  },

  guardarRuta: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`ruta`(`latitud`, `longitud`, `periodo`, `idVehiculo`) VALUES " + req.query.valores,
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

  modificarRuta: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `rute`.`ruta` SET `puntoInicio` = ?, `puntoFinal` = ? WHERE `idRuta` = ?",
      [req.body.puntoInicio, req.body.puntoFinal, req.body.idRuta],
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

  eliminarrRuta: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`ruta` WHERE `idRuta` = ?",
      [req.body.idRuta],
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

};
