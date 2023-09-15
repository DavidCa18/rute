var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
  guardarDireccionRepresentante: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`representante_direccion`(`idRepresentante`, `idDireccion`, `fecha`, `estado`) VALUES " + req.query.data,
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

  modificarDireccionRepresentante: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `rute`.`representante_direccion` SET `idRepresentante` = ?, `idDireccion` = ?, `estado` = ? WHERE `idRepresentanteDireccion` = ?",
      [req.body.idRepresentante, req.body.idDireccion, req.body.estado, req.body.idRepresentanteDireccion],
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


  eliminarDireccionRepresentante: function(req, res, next) {
	
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`representante_direccion` WHERE `idRepresentanteDireccion` = ?",
      [req.body.idRepresentanteDireccion],
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

  buscarDireccionRepresentante: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT * FROM representante_direccion", function(err, data, fields) {
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



  buscarDireccionRepresentanteVisualizacion: function(req, res, next) {

      var db = mysql.createConnection(config);
      db.connect();
  
      db.query("SELECT "
      +" representante_direccion.idRepresentanteDireccion, "
      +" direccion.callePrincipal, "
      +" direccion.calleSecundaria, "
      +" direccion.numeroCasa "
      +" FROM  "
      +" representante_direccion  "
      +" INNER JOIN representante ON representante_direccion.idRepresentante = representante.idRepresentante  "
      +" INNER JOIN direccion ON representante_direccion.idDireccion = direccion.idDireccion  "
      +" WHERE  "
      +" representante.idRepresentante = " + req.query.idRepresentante , function(err, data, fields) {
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


  buscarDireccionRepresentanteCombo: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT idDireccion AS 'value', CONCAT(direccion.callePrincipal,' ',direccion.numeroCasa, ' ', direccion.barrio) AS 'text' FROM direccion",
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
};
