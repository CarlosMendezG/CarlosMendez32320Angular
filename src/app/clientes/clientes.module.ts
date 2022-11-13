import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesInicioComponent } from './components/clientes-inicio/clientes-inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { ClientesCardsComponent } from './components/clientes-cards/clientes-cards.component';
import { ClientesMenuComponent } from './components/clientes-menu/clientes-menu.component';
import { MaterialModule } from '../core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesDetalleComponent } from './components/clientes-detalle/clientes-detalle.component';
import { StoreModule } from '@ngrx/store';
import { clientesFeatureKey, reducer } from './state/clientes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClienteEffects } from './state/cliente.effects';


@NgModule({
  declarations: [
    ClientesInicioComponent,
    ClientesComponent,
    ClientesListComponent,
    ClientesCardsComponent,
    ClientesMenuComponent,
    ClientesDetalleComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(clientesFeatureKey, reducer),
    EffectsModule.forFeature([ClienteEffects])
  ]
})
export class ClientesModule { }
