import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudInicioComponent } from './components/solicitud-inicio/solicitud-inicio.component';
import { SolicitudesInicioComponent } from './components/solicitudes-inicio/solicitudes-inicio.component';


@NgModule({
  declarations: [
    SolicitudInicioComponent,
    SolicitudesInicioComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule
  ]
})
export class SolicitudesModule { }
