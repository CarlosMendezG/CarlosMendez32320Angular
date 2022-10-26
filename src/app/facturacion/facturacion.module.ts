import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionInicioComponent } from './components/facturacion-inicio/facturacion-inicio.component';


@NgModule({
  declarations: [
    FacturacionInicioComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule
  ]
})
export class FacturacionModule { }
