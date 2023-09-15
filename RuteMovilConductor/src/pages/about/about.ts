import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { ModalEstudianteDatosPage } from '../modal-estudiante-datos/modal-estudiante-datos';
import { LoginPipe } from '../../pipes/login/login';
import { ApiProvider } from '../../providers/api/api';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [LoginPipe]
})
export class AboutPage {

  datos: any;
  periodo: any = "2019-2020";
  fecha: any;
  lstEstudiantes = [];
  observableVar: Subscription;
  estadoCompartir = true;
  estadoParar = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public login: LoginPipe, public api: ApiProvider, public toastController: ToastController, private geolocation: Geolocation) {
    this.fecha = this.obtenerFecha();
    this.datos = JSON.parse(this.login.obtenerDatos());
    this.obtenerEstudiantes();
  }

  async visualizarEstudiante(datos) {
    const modal = await this.modalCtrl.create(ModalEstudianteDatosPage, { "datosEstudiante": datos });
    modal.onDidDismiss(data => {
      //RECIBIR DATOS AL CERRAR MODAL
    });
    return await modal.present();
  }

  public obtenerEstudiantes() {
    this.api.get("buscarConductorVehiculoEstudiante?idConductor=" + this.datos.idConductor + "&periodo=" + this.periodo + "").subscribe(
      (res: any) => {
        this.lstEstudiantes = res;
        console.log(res)
      },
      err => {
        this.mostrarNotificacion('Error con el servidor de datos');
        console.log(err);
      }
    );
  }

  public pararPosicion() {
    this.observableVar.unsubscribe();
    this.estadoCompartir = true;
    this.estadoParar = false;
  }

  public gestionarPosicion() {
    this.estadoCompartir = false;
    this.estadoParar = true;
    this.observableVar = Observable.interval(3000).subscribe(() => {
      this.obtenerPosicionActual();
    });
  }

  public obtenerPosicionActual() {
    for (let estudiantes of this.lstEstudiantes) {
      this.geolocation.getCurrentPosition().then(response => {
        this.agregarUbicacionActualEstudiante(response, estudiantes.idEstudiante);
      }).catch(error => {
        console.log('Error getting location', error);
      })
    };
  }

  public agregarUbicacionActualEstudiante(position: Geoposition, idEstudiante) {
    var datos = {
      latitud: position.coords.latitude,
      longitud: position.coords.longitude,
      identificador: this.periodo,
      idEstudiante: idEstudiante
    };
    this.api.post("guardarSeguimientoEstudiante", datos).subscribe(
      (res: any) => {
        console.log(res)
      },
      err => {
        this.mostrarNotificacion('Error con el servidor de datos');
        console.log(err);
      }
    );
  }

  async mostrarNotificacion(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  public obtenerFecha() {
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day;
  }
}
