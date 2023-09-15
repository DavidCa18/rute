import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { TabsPage } from '../tabs/tabs';
import { LoginPipe } from '../../pipes/login/login';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginPipe]
})
export class LoginPage {

  public usuario = {
    email: "",
    password: ""
  }

  constructor(public navCtrl: NavController, public toastController: ToastController, public navParams: NavParams, public verificar:LoginPipe, public api:ApiProvider) {
  }

  ionViewDidLoad() {
   this.verificarSesion();
  }

  paginaRegistrar(){
    this.navCtrl.setRoot(RegistrarPage);
  }

  verificarSesion(){
    var estado =  this.verificar.verificarCredenciales();
    if(estado == true){
      this.navCtrl.setRoot(TabsPage);
    }
  }

  inicioSesion(){
   
    this.api.post("verificacionUsuarioRepresentante", {email: this.usuario.email, password: this.usuario.password}).subscribe(
      (res: any) => {
       var resultado = res;
        if(resultado.length == 0){
          this.mostrarNotificacion('Correo Electrónico y/o Contrasena Incorrecta');
        }else{
          if(resultado[0].rol == 'REPRESENTANTE'){
            this.mostrarNotificacion('Ingreso Correcto a la Plataforma');
            this.verificar.iniciarSesion(res[0]);
            this.navCtrl.setRoot(TabsPage);
          }else{
            this.mostrarNotificacion('Las credenciales que ingresó no pertenecen a un representante');
          }
         
        }
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

}
