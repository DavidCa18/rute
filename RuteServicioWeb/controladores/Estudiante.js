var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
  guardarEstudiante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `rute`.`estudiante`(`identificacion`, `nombre`, `curso`, `telefono`, `foto`) VALUES (?,?,?,?,?)",
      [req.body.identificacion, req.body.nombre, req.body.curso + '-' + req.body.paralelo, req.body.telefono, "../../assets/imgs/estudiantes.png"],
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

  modificarEstudiante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();
    console.log(req.body);
    db.query(
      "UPDATE `estudiante` SET `identificacion` = ?, `nombre` = ?, `curso` = ?, `telefono` = ? WHERE `idEstudiante` = ?",
      [req.body.identificacion, req.body.nombre, req.body.curso + '-' + req.body.paralelo, req.body.telefono, req.body.idEstudiante],
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

  asignarRepresentanteEstudiante: function (req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      `SELECT
      COUNT(estudiante.idEstudiante) AS 'total'
      FROM
      estudiante
      WHERE
      estudiante.idRepresentante = ?`,
      [req.body.idRepresentante],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          db.end();
        } else {
          db.end();
          var datos = data[0];
          var validacion = datos.total;

          if (true) {
            var db2 = mysql.createConnection(config);
            db2.connect();

            db2.query(
              "UPDATE `rute`.`estudiante` SET `idRepresentante` = ? WHERE `idEstudiante` = ?",
              [req.body.idRepresentante, req.body.idEstudiante2],
              function (err2, data2, fields) {
                if (err2) {
                  console.log(err2);
                  res.sendStatus(500);
                  db2.end();
                } else {
                  res.send(true);
                  db2.end();
                }
              }
            );
          } else {
            res.sendStatus(400);
          }
        }
      }
    );
  },

  eliminarEstudiante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "DELETE FROM `rute`.`estudiante` WHERE `idEstudiante` = ?",
      [req.body.idEstudiante],
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

  buscarEstudiante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(`SELECT
    estudiante.idEstudiante,
    estudiante.identificacion,
    estudiante.nombre,
    SUBSTRING_INDEX(estudiante.curso,'-',1) AS 'curso',
    SUBSTRING_INDEX(estudiante.curso,'-',-1) AS 'paralelo',
    estudiante.telefono,
    estudiante.foto,
    estudiante.idRepresentante
    FROM
    estudiante`, function (err, data, fields) {
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

  buscarEstudianteCombo: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT idEstudiante AS 'value', nombre AS 'text' FROM estudiante",
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

  buscarEstudianteRepresentante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      + " estudiante.nombre AS 'estudiante', "
      + " representante.nombre AS 'representante', "
      + " representante.identificacion, "
      + " representante.idRepresentante, "
      + " estudiante.idEstudiante AS 'idEstudiante2' "
      + " FROM "
      + " representante "
      + " INNER JOIN estudiante ON estudiante.idRepresentante = representante.idRepresentante",
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

  eliminarEstudianteRepresentante: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();
    console.log(req.body);
    db.query("UPDATE `estudiante` SET `idRepresentante` = NULL WHERE `idEstudiante` = ?", [req.body.idEstudiante],
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

  buscarEstudianteRepresentanteId: function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      `SELECT
      estudiante.idEstudiante,
      estudiante.nombre,
      estudiante.curso,
      estudiante.telefono,
      estudiante.foto,
      estudiante.idRepresentante
      FROM
      representante
      INNER JOIN estudiante ON estudiante.idRepresentante = representante.idRepresentante
      WHERE estudiante.idRepresentante = ?`, [req.query.idRepresentante],
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

};
