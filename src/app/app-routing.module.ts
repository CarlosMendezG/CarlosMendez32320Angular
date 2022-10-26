import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizacionesInicioComponent } from './autorizaciones/components/autorizaciones-inicio/autorizaciones-inicio.component';
import { ClientesInicioComponent } from './clientes/components/clientes-inicio/clientes-inicio.component';
import { HomeComponent } from './core/components/home/home.component';
import { PaginaNoEncontradaComponent } from './core/components/pagina-no-encontrada/pagina-no-encontrada.component';
import { DistribuidoresInicioComponent } from './distribuidores/components/distribuidores-inicio/distribuidores-inicio.component';
import { FacturacionInicioComponent } from './facturacion/components/facturacion-inicio/facturacion-inicio.component';
import { ProductosInicioComponent } from './productos/components/productos-inicio/productos-inicio.component';
import { SolicitudInicioComponent } from './solicitudes/components/solicitud-inicio/solicitud-inicio.component';
import { TicketsInicioComponent } from './tickets/components/tickets-inicio/tickets-inicio.component';
import { UsuariosInicioComponent } from './usuarios/components/usuarios-inicio/usuarios-inicio.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  // { path: 'clientes', component: ClientesInicioComponent },
  { path: 'distribuidores', component: DistribuidoresInicioComponent },
  { path: 'productos', component: ProductosInicioComponent },
  { path: 'solicitudes', component: SolicitudInicioComponent },
  { path: 'autorizaciones', component: AutorizacionesInicioComponent },
  { path: 'facturacion', component: FacturacionInicioComponent },
  { path: 'tickets', component: TicketsInicioComponent },
  { path: 'usuarios', component: UsuariosInicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  // { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
