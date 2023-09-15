var express = require('express');
var router = express.Router();
var controladores = require('.././controladores');

router.get('/', function(req, res, next) { res.render('index'); });
router.get('/adminIndex', function(req, res, next) { res.render('adminIndex'); });
router.get('/adminConductores', function(req, res, next) { res.render('adminConductores'); });

router.get('/adminEstudiantes', function(req, res, next) { res.render('adminEstudiantes'); });
router.get('/adminRepresentantes', function(req, res, next) { res.render('adminRepresentantes'); });
router.get('/adminVehiculos', function(req, res, next) { res.render('adminVehiculos'); });
router.get('/adminSectores', function(req, res, next) { res.render('adminSectores'); });
router.get('/adminRutas', function(req, res, next) { res.render('adminRutas'); });
router.get('/adminRepresentanteEstudiante', function(req, res, next) { res.render('adminRepresentanteEstudiante'); });
router.get('/adminConductorVehiculo', function(req, res, next) { res.render('adminConductorVehiculo'); });
router.get('/adminEstudianteVehiculo', function(req, res, next) { res.render('adminEstudianteVehiculo'); });
router.get('/adminVehiculoRuta', function(req, res, next) { res.render('adminVehiculoRuta'); });
router.get('/adminUsuarios', function(req, res, next) { res.render('adminUsuarios'); });

router.get('/buscarEstudianteRepresentanteId', controladores.Estudiante.buscarEstudianteRepresentanteId);

router.post('/guardarSeguimientoEstudiante', controladores.SeguimientoEstudiante.guardarSeguimientoEstudiante);
router.get('/buscarSeguimientoEstudiante', controladores.SeguimientoEstudiante.buscarSeguimientoEstudiante);

router.get('/buscarInicioResumen', controladores.Usuario.buscarInicioResumen);

//ESTUDIANTE-VEHICULO
router.post('/guardarEstudianteVehiculo', controladores.EstudianteVehiculo.guardarEstudianteVehiculo);
router.post('/eliminarEstudianteVehiculo', controladores.EstudianteVehiculo.eliminarEstudianteVehiculo);
router.get('/buscarEstudianteVehiculo', controladores.EstudianteVehiculo.buscarEstudianteVehiculo);
router.get('/buscarConductorVehiculoEstudiante', controladores.EstudianteVehiculo.buscarConductorVehiculoEstudiante);

//CONDUCTOR-VEHICULO
router.post('/guardarConductorVehiculo', controladores.ConductorVehiculo.guardarConductorVehiculo);
router.post('/eliminarConductorVehiculo', controladores.ConductorVehiculo.eliminarConductorVehiculo);
router.get('/buscarConductorVehiculo', controladores.ConductorVehiculo.buscarConductorVehiculo);

//RUTA
router.get('/guardarRuta', controladores.Ruta.guardarRuta);
router.get('/obtenerRutasConductor', controladores.Ruta.obtenerRutasConductor);

//CONDUCTOR
router.post('/guardarUsuarioConductor', controladores.Conductor.guardarUsuarioConductor);
router.post('/guardarConductor', controladores.Conductor.guardarConductor);
router.post('/modificarConductor', controladores.Conductor.modificarConductor);
router.post('/eliminarConductor', controladores.Conductor.eliminarConductor);
router.get('/buscarConductor', controladores.Conductor.buscarConductor);
router.get('/buscarConductorCombo', controladores.Conductor.buscarConductorCombo);

//ESTUDIANTE
router.post('/guardarEstudiante', controladores.Estudiante.guardarEstudiante);
router.post('/modificarEstudiante', controladores.Estudiante.modificarEstudiante);
router.post('/asignarRepresentanteEstudiante', controladores.Estudiante.asignarRepresentanteEstudiante);
router.post('/eliminarEstudiante', controladores.Estudiante.eliminarEstudiante);
router.get('/buscarEstudiante', controladores.Estudiante.buscarEstudiante);
router.get('/buscarEstudianteCombo', controladores.Estudiante.buscarEstudianteCombo);
router.get('/buscarEstudianteRepresentante', controladores.Estudiante.buscarEstudianteRepresentante);
router.post('/eliminarEstudianteRepresentante', controladores.Estudiante.eliminarEstudianteRepresentante);


//REPRESENTANTE
router.post('/guardarUsuarioRepresentante', controladores.Representante.guardarUsuarioRepresentante);
router.post('/guardarRepresentante', controladores.Representante.guardarRepresentante);
router.post('/modificarRepresentante', controladores.Representante.modificarRepresentante);
router.post('/eliminarRepresentante', controladores.Representante.eliminarRepresentante);
router.get('/buscarRepresentante', controladores.Representante.buscarRepresentante);
router.get('/buscarRepresentanteCombo', controladores.Representante.buscarRepresentanteCombo);
router.get('/buscarEstudiantesAsignacion', controladores.Representante.buscarEstudiantesAsignacion);

//USUARIO
router.post('/guardarUsuario', controladores.Usuario.guardarUsuario);
router.post('/modificarUsuario', controladores.Usuario.modificarUsuario);
router.post('/eliminarUsuario', controladores.Usuario.eliminarUsuario);
router.get('/buscarUsuario', controladores.Usuario.buscarUsuario);
router.get('/buscarUsuarioComboConductor', controladores.Usuario.buscarUsuarioComboConductor);
router.get('/buscarUsuarioComboRepresentante', controladores.Usuario.buscarUsuarioComboRepresentante);

router.post('/verificacionUsuario', controladores.Usuario.verificacionUsuario);
router.post('/verificacionUsuarioRepresentante', controladores.Usuario.verificacionUsuarioRepresentante);

//VEHICULO
router.post('/guardarVehiculo', controladores.Vehiculo.guardarVehiculo);
router.post('/modificarVehiculo', controladores.Vehiculo.modificarVehiculo);
router.post('/eliminarVehiculo', controladores.Vehiculo.eliminarVehiculo);
router.get('/buscarVehiculo', controladores.Vehiculo.buscarVehiculo);
router.get('/buscarVehiculoCombo', controladores.Vehiculo.buscarVehiculoCombo);

//DIRECCION
router.post('/guardarDireccion', controladores.Direccion.guardarDireccion);
router.post('/modificarDireccion', controladores.Direccion.modificarDireccion);
router.post('/eliminarDireccion', controladores.Direccion.eliminarDireccion);
router.get('/buscarDireccion', controladores.Direccion.buscarDireccion);
router.get('/buscarDireccionRepresentante', controladores.Direccion.buscarDireccionRepresentante);
router.get('/buscarDireccionCombo', controladores.Direccion.buscarDireccionCombo);
router.get('/buscarDireccionLista', controladores.Direccion.buscarDireccionLista);

//DIRECCION REPRESENTANTE
router.get('/guardarDireccionRepresentante', controladores.DireccionRepresentante.guardarDireccionRepresentante);
router.get('/buscarDireccionRepresentanteVisualizacion', controladores.DireccionRepresentante.buscarDireccionRepresentanteVisualizacion);
router.post('/eliminarDireccionRepresentante', controladores.DireccionRepresentante.eliminarDireccionRepresentante);

module.exports = router;
