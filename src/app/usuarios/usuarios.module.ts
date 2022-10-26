import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosInicioComponent } from './components/usuarios-inicio/usuarios-inicio.component';


@NgModule({
  declarations: [
    UsuariosInicioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
