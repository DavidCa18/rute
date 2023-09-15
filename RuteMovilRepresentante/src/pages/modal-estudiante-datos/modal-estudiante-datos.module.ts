import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEstudianteDatosPage } from './modal-estudiante-datos';

@NgModule({
  declarations: [
    ModalEstudianteDatosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEstudianteDatosPage),
  ],
})
export class ModalEstudianteDatosPageModule {}
