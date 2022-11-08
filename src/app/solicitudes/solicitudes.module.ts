import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudInicioComponent } from './components/solicitud-inicio/solicitud-inicio.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { MaterialModule } from '../core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { SolicitudNuevaComponent } from './components/solicitud-nueva/solicitud-nueva.component';


@NgModule({
  declarations: [
    SolicitudInicioComponent,
    SolicitudComponent,
    SolicitudesComponent,
    SolicitudNuevaComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  exports: [

  ]
})
export class SolicitudesModule { }
