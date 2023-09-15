var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
  guardarUsuarioRepresentante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
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
          db.query(
            "INSERT INTO `rute`.`representante`(`identificacion`, `nombre`, `telefono`, `direccion`, `foto`, `idUsuario`) VALUES (?,?,?,?,?,?)",
            [
              req.body.identificacion,
              req.body.nombre,
              req.body.telefono,
              req.body.direccion,
              req.body.foto,
              data.insertId
            ],
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
        }
      }
    );
  },

  guardarRepresentante: function (req, res_, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`usuario`(`email`, `password`, `rol`) VALUES (?,?,?)",
      [req.body.email, req.body.identificacion, 'REPRESENTANTE'],
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
            "INSERT INTO `rute`.`representante`(`identificacion`, `nombre`, `telefono`, `foto`, `idUsuario`) VALUES (?,?,?,?,?)",
            [
              req.body.identificacion,
              req.body.nombre,
              req.body.telefono,
              '/representante.png',
              idUsuario
            ],
            function (err, data, fields) {
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

  modificarRepresentante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    var db = mysql.createConnection(config);
    db.connect();
    db.query(
      "UPDATE `rute`.`representante` SET `identificacion` = ?, `nombre` = ?, `telefono` = ?, `idUsuario` = ? WHERE `idRepresentante` = ?",
      [
        req.body.identificacion,
        req.body.nombre,
        req.body.telefono,
        req.body.idUsuario,
        req.body.idRepresentante,
        req.body.foto,
      ],
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

  eliminarRepresentante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`representante` WHERE `idRepresentante` = ?",
      [req.body.idRepresentante],
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

  buscarRepresentante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      `SELECT
      representante.idRepresentante,  
      representante.identificacion,  
      representante.nombre,  
      representante.telefono,  
      representante.foto,  
      representante.idUsuario,  
      GROUP_CONCAT(direccion.idDireccion) as 'idsDireccion',  
      GROUP_CONCAT(  
      CONCAT('N°: ', direccion.callePrincipal,', ',  
      direccion.calleSecundaria,', ',  
      direccion.numeroCasa) SEPARATOR ' - ') AS 'direccion',
usuario.email
FROM
representante
LEFT JOIN representante_direccion ON representante_direccion.idRepresentante = representante.idRepresentante
LEFT JOIN direccion ON representante_direccion.idDireccion = direccion.idDireccion
INNER JOIN usuario ON representante.idUsuario = usuario.idUsuario
GROUP BY
representante.idRepresentante
ORDER BY
representante.idRepresentante DESC`,
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

  buscarEstudiantesAsignacion: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT * FROM representante", function (err, data, fields) {
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

  buscarRepresentanteCombo: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT representante.idRepresentante AS 'value', representante.nombre AS 'text' FROM representante",
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
  }
};
