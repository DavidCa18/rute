var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
  guardarVehiculo: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`vehiculo`(`numero`, `placas`, `capacidad`) VALUES (?,?,?)",
      [req.body.numero, req.body.placas.toUpperCase(), req.body.capacidad],
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

  modificarVehiculo: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `rute`.`vehiculo` SET `numero` = ?, `placas` = ?, `capacidad` = ? WHERE `idVehiculo` = ?",
      [req.body.numero, req.body.placas.toUpperCase(), req.body.capacidad, req.body.idVehiculo],
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

  eliminarVehiculo: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`vehiculo` WHERE `idVehiculo` = ?",
      [req.body.idVehiculo],
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

  buscarVehiculo: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT * FROM vehiculo", function(err, data, fields) {
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
  
  buscarVehiculoCombo: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT vehiculo.idVehiculo AS 'value', CONCAT('N° Vehículo: ', vehiculo.numero, ' - Placa: ' ,vehiculo.placas) AS 'text' FROM vehiculo ", function(err, data, fields) {
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
