import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribuidoresRoutingModule } from './distribuidores-routing.module';
import { DistribuidoresInicioComponent } from './components/distribuidores-inicio/distribuidores-inicio.component';
import { MaterialModule } from '../core/material.module';


@NgModule({
  declarations: [
    DistribuidoresInicioComponent
  ],
  imports: [
    CommonModule,
    DistribuidoresRoutingModule,
    MaterialModule
  ]
})
export class DistribuidoresModule { }
