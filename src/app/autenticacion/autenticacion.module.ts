import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionInicioComponent } from './components/autenticacion-inicio/autenticacion-inicio.component';
import { AutenticacionLoginComponent } from './components/autenticacion-login/autenticacion-login.component';
import { CoreModule } from '../core/core.module';
import { AutenticacionNuevoComponent } from './components/autenticacion-nuevo/autenticacion-nuevo.component';

@NgModule({
  declarations: [
    AutenticacionInicioComponent,
    AutenticacionLoginComponent,
    AutenticacionNuevoComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AutenticacionRoutingModule
  ]
})
export class AutenticacionModule { }
