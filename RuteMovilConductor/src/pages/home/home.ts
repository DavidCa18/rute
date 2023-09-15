import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoginPipe } from '../../pipes/login/login';
import { ApiProvider } from '../../providers/api/api';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginPipe]
})
export class HomePage {

  map: any;
  periodo: any;
  datos: any;
  lstRutas: any;
  marcadores: any;
  lstMarkers = [];


  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any = [];

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public login: LoginPipe, public api: ApiProvider, public toastController: ToastController) {
    this.datos = JSON.parse(this.login.obtenerDatos());
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
    console.log(this.datos)
  }

  ionViewDidLoad() {
    this.getPosition();
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

    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    let panelEle: HTMLElement = document.getElementById('panel');

    // create LatLng object
    this.myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: this.myLatLng,
        map: this.map,
        icon: "assets/imgs/pin-conductor.png",
        title: 'Mi Ubicación'
      });
      mapEle.classList.add('show-map');
    });
  }

  public calcularRuta() {

    this.bounds.extend(this.myLatLng);

    this.waypoints.forEach(waypoint => {
      var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);
    });

    this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });

  }

  public agregarMarcadores(map, lstRutas: any) {

    if (this.marcadores != undefined) {
      this.eliminarMarcadores(null);
      this.lstMarkers = [];
    }
    for (var rutas of lstRutas) {
      let myLatLng = { lat: parseFloat(rutas.latitud), lng: parseFloat(rutas.longitud) };
      this.marcadores = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: "assets/imgs/pin-rutas.png",
        title: rutas.numero
      });
      this.lstMarkers.push(this.marcadores);
    }
  }

  public eliminarMarcadores(map) {
    for (var i = 0; i < this.lstMarkers.length; i++) {
      this.lstMarkers[i].setMap(map);
    }
  }

  public obtenerRutasConductor() {
    this.api.get("obtenerRutasConductor?idConductor=" + this.datos.idConductor + "&periodo=" + this.periodo + "").subscribe(
      (res: any) => {
        this.lstRutas = res;
        this.agregarMarcadores(this.map, this.lstRutas);
        this.gestionarPuntos();
        console.log(this.lstRutas);

      },
      err => {
        this.mostrarNotificacion('Error con el servidor de datos');
        console.log(err);
      }
    );
  }

  public gestionarPuntos() {
    for (let puntos of this.lstRutas) {
      this.waypoints.push(
        {
          location: { lat: parseFloat(puntos.latitud), lng: parseFloat(puntos.longitud) },
          stopover: true,
        }
      );
    }
  }

  async mostrarNotificacion(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
