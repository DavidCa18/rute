import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { ModalEstudianteDatosPage } from '../modal-estudiante-datos/modal-estudiante-datos';
import { LoginPipe } from '../../pipes/login/login';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [LoginPipe]
})
export class AboutPage {

  datos: any;
  periodo: any = "2019-2020";
  estudiante: any;
  fecha: any;
  lstEstudiantes = [];
  lstRutas = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public login: LoginPipe, public api: ApiProvider, public toastController: ToastController) {
    this.fecha = this.obtenerFecha();
    this.datos = JSON.parse(this.login.obtenerDatos());
    this.buscarEstudiantesRepresentanteId();
  }

  async visualizarEstudiante(datos) {
    const modal = await this.modalCtrl.create(ModalEstudianteDatosPage, { "datosEstudiante": datos });
    modal.onDidDismiss(data => {
      //RECIBIR DATOS AL CERRAR MODAL
    });
    return await modal.present();
  }

  public enviarNotificacion(distancia) {
    if (distancia >= 0 && distancia <= 20) {
      return ("La unidad de transporte esta a 2 minutos de su destino.");
    } else if (distancia >= 55 && distancia <= 60) {
      return ("La unidad de transporte esta a 5 minutos de su destino.");
    } else if (distancia >= 95 && distancia <= 100) {
      return ("La unidad de transporte esta a 10 minutos de su destino.");
    }
  }


  public buscarEstudiantesRepresentanteId() {
    this.api.get("buscarEstudianteRepresentanteId?idRepresentante=" + this.datos.idRepresentante + "").subscribe(
      (res: any) => {
        this.lstEstudiantes = res;
        console.log(res);
      },
      err => {
        this.mostrarNotificacion('Error con el servidor de datos');
        console.log(err);
      }
    );
  }

  public buscarHistorial() {
    this.lstRutas = [
      { estudiante: '', latitud: -0.19885959118059401, longitud: -78.50044117906012, estado: 0, distancia: 400 },
      { estudiante: '', latitud: -0.2025895632913566, longitud: -78.50156963376766, estado: 0, distancia: 300 },
      { estudiante: '', latitud: -0.20488036979251686, longitud: -78.50709404014586, estado: 0, distancia: 96 },
      { estudiante: '', latitud: -0.2080989997076199, longitud: -78.51284469627379, estado: 0, distancia: 56 },
      { estudiante: '', latitud: -0.21602394120875967, longitud: -78.51779317679839, estado: 0, distancia: 10 },
    ];
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
