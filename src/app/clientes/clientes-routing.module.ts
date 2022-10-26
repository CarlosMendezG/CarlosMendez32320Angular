import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCardsComponent } from './components/clientes-cards/clientes-cards.component';
import { ClientesInicioComponent } from './components/clientes-inicio/clientes-inicio.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  {
    path: 'clientes', component: ClientesInicioComponent, children: [
      { path: 'cliente', component: ClientesComponent },
      { path: 'cards', component: ClientesCardsComponent },
      { path: 'list', component: ClientesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
