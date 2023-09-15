var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
  guardarDireccion: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`direccion`(`callePrincipal`, `calleSecundaria`, `numeroCasa`, `barrio`, `zona`, `latitud`, `longitud`) VALUES (?,?,?,?,?,?,?)",
      [req.body.callePrincipal, req.body.calleSecundaria, req.body.numeroCasa, req.body.barrio, req.body.zona, req.body.latitud, req.body.longitud],
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

  modificarDireccion: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `rute`.`direccion` SET `callePrincipal` = ?, `calleSecundaria` = ?, `numeroCasa` = ?, `barrio` = ?, `zona` = ?, `latitud` = ?, `longitud` = ? WHERE `idDireccion` = ?",
      [req.body.callePrincipal, req.body.calleSecundaria, req.body.numeroCasa, req.body.barrio, req.body.zona, req.body.latitud, req.body.longitud, req.body.idDireccion],
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


  eliminarDireccion: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`direccion` WHERE `idDireccion` = ?",
      [req.body.idDireccion],
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

  buscarDireccion: function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT * FROM direccion", function(err, data, fields) {
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

  buscarDireccionLista: function(req, res, next) {

      var db = mysql.createConnection(config);
      db.connect();
  
      db.query("SELECT "
      +" CONCAT(direccion.callePrincipal, ', ', direccion.calleSecundaria, ', ', direccion.numeroCasa) AS 'direccion', "
      +" direccion.idDireccion, "
      +" direccion.callePrincipal, "
      +" direccion.calleSecundaria, "
      +" direccion.numeroCasa, "
      +" direccion.barrio, "
      +" direccion.zona "
      +" FROM "
      +" direccion", function(err, data, fields) {
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
  

  buscarDireccionRepresentante: function(req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT "
    +" direccion.callePrincipal, "
    +" direccion.calleSecundaria, "
    +" direccion.numeroCasa, "
    +" direccion.barrio, "
    +" direccion.zona, "
    +" direccion.latitud, "
    +" direccion.longitud "
    +" FROM "
    +" representante "
    +" INNER JOIN representante_direccion ON representante_direccion.idRepresentante = representante.idRepresentante "
    +" INNER JOIN direccion ON representante_direccion.idDireccion = direccion.idDireccion "
    +" WHERE "
    +" representante.idRepresentante = ?",[req.query.idRepresentante], function(err, data, fields) {
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

  buscarDireccionCombo: function(req, res, next) {

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
