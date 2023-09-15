var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {

  buscarConductorVehiculo: function (req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      + " conductor.idConductor, "
      + " conductor_vehiculo.idConductorVehiculo, "
      + " conductor.nombre, "
      + " vehiculo.idVehiculo, "
      + " CONCAT(vehiculo.placas,' - ',vehiculo.numero) AS 'vehiculo', conductor_vehiculo.fecha "
      + " FROM "
      + " conductor "
      + " INNER JOIN conductor_vehiculo ON conductor_vehiculo.idConductor = conductor.idConductor "
      + " INNER JOIN vehiculo ON conductor_vehiculo.idVehiculo = vehiculo.idVehiculo",
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

  guardarConductorVehiculo: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT "
      + " conductor_vehiculo.idConductorVehiculo "
      + " FROM "
      + " conductor_vehiculo "
      + " WHERE "
      + " conductor_vehiculo.idVehiculo = " + req.body.idVehiculo + " "
      + " AND "
      + " conductor_vehiculo.idConductor = " + req.body.idConductor + ""
      + " AND conductor_vehiculo.fecha = '" + req.body.fecha + "'", function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          db.end();
          var datos = data[0];
          if (datos != undefined) {
            res.sendStatus(404);
          } else {
            var db2 = mysql.createConnection(config);
            db2.connect();

            db2.query(
              "INSERT INTO `conductor_vehiculo`(`idConductor`, `idVehiculo`, `fecha`) VALUES (?, ?, ?)",
              [
                req.body.idConductor,
                req.body.idVehiculo,
                req.body.fecha,
              ],
              function (err, data, fields) {
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                  db2.end();
                } else {
                  db2.end();
                  res.send(true);
                }
              }
            );
          }
        }
      });
  },

  eliminarConductorVehiculo: function (req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `conductor_vehiculo` WHERE `idConductorVehiculo` = ?",
      [req.body.idConductorVehiculo],
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

};
