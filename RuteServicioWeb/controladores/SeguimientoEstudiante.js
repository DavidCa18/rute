var mysql = require("mysql");
var config = require(".././basedatos/basedatos.js");

module.exports = {
    guardarSeguimientoEstudiante: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(
            "INSERT INTO `seguimiento_estudiante`(`latitud`, `longitud`, `idEstudiante`,`identificador`,`fecha`) VALUES (?,?,?,?,NOW())",
            [req.body.latitud, req.body.longitud, req.body.idEstudiante, req.body.identificador],
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

    buscarSeguimientoEstudiante: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`SELECT
        estudiante.idEstudiante,
        estudiante.nombre AS 'estudiante',
        representante.idRepresentante,
        representante.nombre AS 'representante',
        seguimiento_estudiante.latitud,
        seguimiento_estudiante.longitud,
        seguimiento_estudiante.fecha
        FROM
        estudiante
        INNER JOIN seguimiento_estudiante ON seguimiento_estudiante.idEstudiante = estudiante.idEstudiante
        INNER JOIN representante ON estudiante.idRepresentante = representante.idRepresentante
        WHERE
        estudiante.idEstudiante = ? AND representante.idRepresentante = ? AND seguimiento_estudiante.identificador = ?
        ORDER BY
        seguimiento_estudiante.fecha DESC
        LIMIT 1`, [req.query.idEstudiante, req.query.idRepresentante, req.query.identificador], function (err, data, fields) {
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
}