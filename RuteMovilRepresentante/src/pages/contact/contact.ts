import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPipe } from '../../pipes/login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [LoginPipe]
})
export class ContactPage {
  
  datos: any;
  lstRutas: any = [
    { estudiante: '', latitud: -0.19885959118059401, longitud: -78.50044117906012, estado: 0, distancia: 400 },
    { estudiante: '', latitud: -0.2025895632913566, longitud: -78.50156963376766, estado: 0, distancia: 300 },
    { estudiante: '', latitud: -0.20488036979251686, longitud: -78.50709404014586, estado: 0, distancia: 96 },
    { estudiante: '', latitud: -0.2080989997076199, longitud: -78.51284469627379, estado: 0, distancia: 56 },
    { estudiante: '', latitud: -0.21602394120875967, longitud: -78.51779317679839, estado: 0, distancia: 10 },
  ];

  constructor(public navCtrl: NavController, public login: LoginPipe, public toastController: ToastController) {
    this.datos = JSON.parse(this.login.obtenerDatos());
  }


  public enviarNotificacion(distancia) {
    if (distancia >= 0 && distancia <= 20) {
      this.mostrarNotificacion("El recorrido con el estudiante esta a 2 minutos.");
    } else if (distancia >= 55 && distancia <= 60) {
      this.mostrarNotificacion("El recorrido con el estudiante esta a 5 minutos.");
    } else if (distancia >= 95 && distancia <= 100) {
      this.mostrarNotificacion("El recorrido con el estudiante esta a 10 minutos.");
    }
  }

  async mostrarNotificacion(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
