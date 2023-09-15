import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  public conductor = {
    "identificacion" : "",
    "nombre" : "",
    "telefono" : "",
    "direccion" : "",
    "foto" : "../assets/imgs/usuario.png",
    "email" : "",
    "password" : "",
    "confirmPassword" : ""
  }

  public mensajeEstado = null;
  public mensajeTexto = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public conexion: ApiProvider,  private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

  }

  registrarConductor(){

    if(this.conductor.identificacion == "" || this.conductor.identificacion == null || this.conductor.identificacion == undefined){
      this.mostartMensaje("Ingresar un número de identificación válido");
    }else if(this.conductor.nombre == "" || this.conductor.nombre == null || this.conductor.nombre == undefined){
      this.mostartMensaje("Ingresar un nombre válido");
    }else if(this.conductor.telefono == "" || this.conductor.telefono == null || this.conductor.telefono == undefined){
      this.mostartMensaje("Ingresar un número de telefono válido");
    }else if(this.conductor.direccion == "" || this.conductor.direccion == null || this.conductor.direccion == undefined){
      this.mostartMensaje("Ingresar una dirección válida");
    }else if(this.conductor.email == "" || this.conductor.email == null || this.conductor.email == undefined){
      this.mostartMensaje("Ingresar un correo electrónico válido");
    }else if(this.conductor.password == "" || this.conductor.password == null || this.conductor.password == undefined){
      this.mostartMensaje("Ingresar una contraseña válida");
    }else if(this.conductor.confirmPassword == "" || this.conductor.confirmPassword == null || this.conductor.confirmPassword == undefined){
      this.mostartMensaje("Ingresar una contraseña de confirmación válida");
    }else if(this.conductor.password != this.conductor.confirmPassword){
      this.mostartMensaje("Las contraseñas ingresadas no coinciden");
    }else {
      this.conexion.post("guardarUsuarioConductor", this.conductor).subscribe(
        (res: any) => {

          this.mostrarAlerta('Éxito!', 'Se ha registrado a la plataforma exitosamente');
          setTimeout(() => {
            this.navCtrl.setRoot(LoginPage);
          }, 2000);
        },
        err => {
          console.log(err);
          this.mostrarAlerta('¡Error!', JSON.stringify(err));
        }
      );
    }
  }

  paginaIniciar(){
    this.navCtrl.setRoot(LoginPage);
  }

  mostrarAlerta(titulo, descripcion) {
    let alert = this.alertCtrl.create({
      title: "" + titulo + "",
      subTitle: "" + descripcion + "",
      buttons: ["Aceptar"]
    });
    alert.present();
  }

  mostartMensaje(texto: string){
    this.mensajeEstado = true;
    this.mensajeTexto = texto;
    setTimeout(() => { this.mensajeEstado = false; this.mensajeTexto = ""; }, 3000);
  }

}
