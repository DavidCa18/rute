import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'login',
})
export class LoginPipe implements PipeTransform {

  transform(value: string, ...args) {
    return value.toLowerCase();
  }

  cerrarSesion() {
    localStorage.removeItem("Rute-Key-Representante");
  }

  iniciarSesion(usuario: any) {
    localStorage.setItem("Rute-Key-Representante", JSON.stringify(usuario));
  }

  verificarCredenciales() {
    if (localStorage.getItem("Rute-Key-Representante") === null) {
      return false;
    }else{
      return true;
    }
  }

  obtenerDatos() {
    return localStorage.getItem("Rute-Key-Representante");
  }
}
