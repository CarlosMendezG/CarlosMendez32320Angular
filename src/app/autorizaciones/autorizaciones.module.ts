import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizacionesRoutingModule } from './autorizaciones-routing.module';
import { AutorizacionesInicioComponent } from './components/autorizaciones-inicio/autorizaciones-inicio.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';



@NgModule({
  declarations: [
    AutorizacionesInicioComponent
  ],
  imports: [
    CommonModule,
    AutorizacionesRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MatIconModule,
    MatFormFieldModule
   ]
  })

export class AutorizacionesModule { }
