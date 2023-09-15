var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {

  buscarConductorVehiculoEstudiante: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      + " conductor.idConductor, "
      + " conductor.nombre AS 'nombreConductor', "
      + " conductor.foto AS 'fotoConductor', "
      + " vehiculo.numero, "
      + " vehiculo.placas, "
      + " estudiante_vehiculo.periodo, "
      + " estudiante.idEstudiante, "
      + " estudiante.nombre AS 'nombreEstudiante', "
      + " estudiante.curso, "
      + " estudiante.telefono AS 'telefonoEstudiante', "
      + " estudiante.foto AS 'fotoEstudiante', "
      + " representante.idRepresentante, "
      + " representante.identificacion, "
      + " representante.nombre AS 'nombreRepresentante', "
      + " representante.telefono AS 'telefonoRepresentante', "
      + " representante.foto AS 'fotoRepresentante', "
      + " representante_direccion.estado AS 'direccionEstado', "
      + " direccion.callePrincipal, "
      + " direccion.calleSecundaria, "
      + " direccion.numeroCasa, "
      + " direccion.barrio, "
      + " direccion.zona, "
      + " direccion.latitud, "
      + " direccion.longitud "
      + " FROM "
      + " conductor "
      + " INNER JOIN conductor_vehiculo ON conductor_vehiculo.idConductor = conductor.idConductor "
      + " INNER JOIN vehiculo ON conductor_vehiculo.idVehiculo = vehiculo.idVehiculo "
      + " INNER JOIN estudiante_vehiculo ON estudiante_vehiculo.idVehiculo = vehiculo.idVehiculo "
      + " INNER JOIN estudiante ON estudiante_vehiculo.idEstudiante = estudiante.idEstudiante "
      + " INNER JOIN representante ON estudiante.idRepresentante = representante.idRepresentante "
      + " INNER JOIN representante_direccion ON representante_direccion.idRepresentante = representante.idRepresentante "
      + " INNER JOIN direccion ON representante_direccion.idDireccion = direccion.idDireccion "
      + " WHERE  "
      + " conductor.idConductor = ? "
      + " AND "
      + " estudiante_vehiculo.periodo = ?", [req.query.idConductor, req.query.periodo],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          db.end();
          res.send(data);
        }
      }
    );
  },

  buscarEstudianteVehiculo: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      + " estudiante.idEstudiante, "
      + " estudiante_vehiculo.idEstudianteVehiculo, "
      + " vehiculo.idVehiculo, "
      + " estudiante_vehiculo.fecha, "
      + " estudiante_vehiculo.periodo, "
      + " estudiante.nombre, "
      + " CONCAT('N° Vehículo: ', vehiculo.numero, ' - Placa: ' ,vehiculo.placas) AS 'vehiculo' "
      + " FROM "
      + " estudiante "
      + " INNER JOIN estudiante_vehiculo ON estudiante_vehiculo.idEstudiante = estudiante.idEstudiante "
      + " INNER JOIN vehiculo ON estudiante_vehiculo.idVehiculo = vehiculo.idVehiculo",
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          db.end();
          res.send(data);
        }
      }
    );
  },

  guardarEstudianteVehiculo: function (req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT "
      + " estudiante_vehiculo.idEstudianteVehiculo "
      + " FROM "
      + " estudiante_vehiculo "
      + " WHERE "
      + " estudiante_vehiculo.idVehiculo = " + req.body.idVehiculo + " "
      + " AND "
      + " estudiante_vehiculo.idEstudiante = " + req.body.idEstudiante + ""
      + " AND estudiante_vehiculo.periodo = '" + req.body.periodo + "'", function (err, data, fields) {
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
              "INSERT INTO `estudiante_vehiculo`(`idEstudiante`, `idVehiculo`, `fecha`, `periodo`) VALUES (?,?,NOW(),?)",
              [
                req.body.idEstudiante,
                req.body.idVehiculo,
                req.body.periodo,
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

  eliminarEstudianteVehiculo: function (req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `estudiante_vehiculo` WHERE `idEstudianteVehiculo` = ?",
      [req.body.idEstudianteVehiculo],
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
