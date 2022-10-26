import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsInicioComponent } from './components/tickets-inicio/tickets-inicio.component';


@NgModule({
  declarations: [
    TicketsInicioComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
