import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoginPipe } from '../../pipes/login/login';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginPipe]
})
export class HomePage {

  map: any;
  periodo: any = "2019-2020";
  datos: any;
  lstRutas: any = [
    { estudiante: '', latitud: -0.19885959118059401, longitud: -78.50044117906012, estado: 0, distancia: 400, fin: 0 },
    { estudiante: '', latitud: -0.2025895632913566, longitud: -78.50156963376766, estado: 0, distancia: 300, fin: 0 },
    { estudiante: '', latitud: -0.20488036979251686, longitud: -78.50709404014586, estado: 0, distancia: 96, fin: 0 },
    { estudiante: '', latitud: -0.2080989997076199, longitud: -78.51284469627379, estado: 0, distancia: 56, fin: 0 },
    { estudiante: '', latitud: -0.21602394120875967, longitud: -78.51779317679839, estado: 0, distancia: 10, fin: 0 },
    { estudiante: '', latitud: -0.21602394120875967, longitud: -78.51779317679839, estado: 0, distancia: -1, fin: 1 },
  ];
  marcadores: any;
  lstMarkers = [];
  lstEstudiantes = [];
  estudianteVisualizado: any = "Ninguno/a";
  estadoVisualizacion = false;
  observableVar: Subscription;
  myLatLng: any;
  distancia = 0;
  constructor(public navCtrl: NavController, private geolocation: Geolocation, public login: LoginPipe, public api: ApiProvider, public toastController: ToastController, private alertCtrl: AlertController) {
    this.datos = JSON.parse(this.login.obtenerDatos());
    console.log(this.datos)
  }

  ionViewDidLoad() {
    this.getPosition();
    this.buscarEstudiantesRepresentanteId();
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    }).catch(error => {
      console.log('Error getting location', error);
    })
  }

  loadMap(position: Geoposition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    this.myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: this.myLatLng,
        map: this.map,
        icon: "assets/imgs/pin-rutas.png",
        title: 'Mi Ubicación'
      });
      mapEle.classList.add('show-map');
    });
  }

  public agregarMarcadores(map, lstRutas: any) {

    if (this.marcadores != undefined) {
      this.eliminarMarcadores(null);
      this.lstMarkers = [];
    }
    //  for (var rutas of lstRutas) {
    let myLatLng = { lat: parseFloat(lstRutas.latitud), lng: parseFloat(lstRutas.longitud) };
    this.marcadores = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: "assets/imgs/pin-estudiante.png",
      title: lstRutas.estudiante
    });
    this.lstMarkers.push(this.marcadores);
    // }
  }

  public eliminarMarcadores(map) {
    for (var i = 0; i < this.lstMarkers.length; i++) {
      this.lstMarkers[i].setMap(map);
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

  public buscarEstudianteUbicacionActual(estudiantes: any) {
    this.estudianteVisualizado = estudiantes.nombre;
    this.estadoVisualizacion = true;

    this.observableVar = Observable.interval(10000).subscribe(() => {

      for (let punto of this.lstRutas) {
        if (punto.estado == 0) {
          if(punto.fin == 1){
            let alert = this.alertCtrl.create({
              title: 'Importante!',
              subTitle: 'La unidad de transporte a llegado.',
              buttons: ['Aceptar']
            });
            alert.present();
          }
          this.eliminarMarcadores(this.map);
          this.agregarMarcadores(this.map, punto);

          console.log(this.lstRutas);
          this.enviarNotificacion(punto.distancia);
          punto.estado = 1;
          break;
        }
      }

      /*this.api.get("buscarSeguimientoEstudiante?idEstudiante=" + estudiantes.idEstudiante + "&idRepresentante=" + this.datos.idRepresentante + "&identificador=" + this.periodo).subscribe(
        (res: any) => {
          this.lstRutas = res;
          this.eliminarMarcadores(this.map);
          this.agregarMarcadores(this.map, this.lstRutas);
          
          console.log(this.lstRutas);
          //this.distancia = this.obtenerDistancia(this.lstRutas[0].latitud, this.lstRutas[0].longitud, this.myLatLng.lat, this.myLatLng.lng, 'K');
          this.enviarNotificacion(this.distancia);
        },
        err => {
          this.mostrarNotificacion('Error con el servidor de datos');
          console.log(err);
        }
      );*/
    });
  }

  public enviarNotificacion(distancia) {
    if (distancia >= 0 && distancia <= 20) {
      this.mostrarNotificacion("La unidad de transporte esta a 2 minutos de su destino.");
    } else if (distancia >= 55 && distancia <= 60) {
      this.mostrarNotificacion("La unidad de transporte esta a 5 minutos de su destino.");
    } else if (distancia >= 95 && distancia <= 100) {
      this.mostrarNotificacion("La unidad de transporte esta a a 10 minutos de su destino.");
    }
    /*var metros = distancia / 0.0010000;
    var dis = Math.round(metros);
    if (dis >= 0 && dis <= 20) {
      this.mostrarNotificacion("El recorrido con el estudiante esta a 2 minutos.");
    } else if (dis >= 55 && dis <= 60) {
      this.mostrarNotificacion("El recorrido con el estudiante esta a 5 minutos.");
    } else if (dis >= 95 && dis <= 100) {
      this.mostrarNotificacion("El recorrido con el estudiante esta a 10 minutos.");
    }*/
  }

  public convertirKMaM(distancia) {
    var metros = distancia / 0.0010000;
    var dis = Math.round(metros);
    return dis;
  }

  public obtenerDistancia(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  public pararPosicion() {
    this.observableVar.unsubscribe();
    this.estadoVisualizacion = false;
    this.estudianteVisualizado = "Ninguno/a";
    this.eliminarMarcadores(this.map);
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
