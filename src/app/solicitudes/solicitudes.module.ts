import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudInicioComponent } from './components/solicitud-inicio/solicitud-inicio.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { MaterialModule } from '../core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { SolicitudEditarComponent } from './components/solicitud-editar/solicitud-editar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    SolicitudInicioComponent,
    SolicitudComponent,
    SolicitudesComponent,
    SolicitudEditarComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [

  ]
})
export class SolicitudesModule { }
