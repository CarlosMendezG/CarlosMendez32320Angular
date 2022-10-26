import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizacionesRoutingModule } from './autorizaciones-routing.module';
import { AutorizacionesInicioComponent } from './components/autorizaciones-inicio/autorizaciones-inicio.component';


@NgModule({
  declarations: [
    AutorizacionesInicioComponent
  ],
  imports: [
    CommonModule,
    AutorizacionesRoutingModule
  ]
})
export class AutorizacionesModule { }
