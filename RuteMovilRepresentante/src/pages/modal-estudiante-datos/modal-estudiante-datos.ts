import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
declare var google;

@IonicPage()
@Component({
  selector: 'page-modal-estudiante-datos',
  templateUrl: 'modal-estudiante-datos.html',
})
export class ModalEstudianteDatosPage {

  public datosEstudiante: any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.datosEstudiante = navParams.get("datosEstudiante");
    console.log(this.datosEstudiante);
  }

  ionViewDidLoad() {
    this.marcarUbicacionEstudiante(parseFloat(this.datosEstudiante.latitud), parseFloat(this.datosEstudiante.longitud));
  }

  marcarUbicacionEstudiante(latitud: any, longitud: any){
    let latitude = latitud;
    let longitude = longitud;

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('mapaEstudiante');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Domicilio Estudiante'
      });
      mapEle.classList.add('show-map');
    });
  }

  cerrar() {
    this.viewCtrl.dismiss({"resultado": 1});
  }

}
