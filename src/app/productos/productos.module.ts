import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosInicioComponent } from './components/productos-inicio/productos-inicio.component';
import { MaterialModule } from '../core/material.module';


@NgModule({
  declarations: [
    ProductosInicioComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule
  ]
})
export class ProductosModule { }
