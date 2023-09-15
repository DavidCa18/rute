import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPipe } from '../../pipes/login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [LoginPipe]
})
export class ContactPage {
  datos:any;
  constructor(public navCtrl: NavController, public login: LoginPipe) {
    this.datos = JSON.parse(this.login.obtenerDatos());
  }

}
