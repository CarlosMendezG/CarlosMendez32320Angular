import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosInicioComponent } from './components/usuarios-inicio/usuarios-inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosEditarComponent } from './components/usuarios-editar/usuarios-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';


@NgModule({
  declarations: [
    UsuariosInicioComponent,
    UsuariosComponent,
    UsuariosEditarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
