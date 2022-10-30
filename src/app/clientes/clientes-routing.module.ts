import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AutenticacionGuard } from '../core/guards/autenticacion.guard';
import { ClientesCardsComponent } from './components/clientes-cards/clientes-cards.component';
import { ClientesDetalleComponent } from './components/clientes-detalle/clientes-detalle.component';
import { ClientesInicioComponent } from './components/clientes-inicio/clientes-inicio.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  {
    path: '', component: ClientesInicioComponent, children: [
      { path: 'cliente', component: ClientesComponent, canActivate: [AutenticacionGuard, AdminGuard] },
      // { path: 'cliente/:id', component: ClientesComponent },
      { path: 'cards', component: ClientesCardsComponent },
      { path: 'list', component: ClientesListComponent },
      { path: 'detalle', component: ClientesDetalleComponent },
      // { path: 'detalle/:id', component: ClientesDetalleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
