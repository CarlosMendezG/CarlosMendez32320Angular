import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizacionesInicioComponent } from './autorizaciones/components/autorizaciones-inicio/autorizaciones-inicio.component';
import { HomeComponent } from './core/components/home/home.component';
import { PaginaNoEncontradaComponent } from './core/components/pagina-no-encontrada/pagina-no-encontrada.component';
import { SoloPersonalAutorizadoComponent } from './core/components/solo-personal-autorizado/solo-personal-autorizado.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AutenticacionGuard } from './core/guards/autenticacion.guard';
import { LoginGuard } from './core/guards/login.guard';
import { DistribuidoresInicioComponent } from './distribuidores/components/distribuidores-inicio/distribuidores-inicio.component';
import { FacturacionInicioComponent } from './facturacion/components/facturacion-inicio/facturacion-inicio.component';
import { ProductosInicioComponent } from './productos/components/productos-inicio/productos-inicio.component';
import { TicketsInicioComponent } from './tickets/components/tickets-inicio/tickets-inicio.component';
import { UsuariosInicioComponent } from './usuarios/components/usuarios-inicio/usuarios-inicio.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent, canActivate: [AutenticacionGuard] },
  { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then((m) => m.ClientesModule), canActivate: [AutenticacionGuard] },
  { path: 'autenticacion', loadChildren: () => import('./autenticacion/autenticacion.module').then((m) => m.AutenticacionModule), canActivate: [LoginGuard] },
  { path: 'distribuidores', component: DistribuidoresInicioComponent, canActivate: [AutenticacionGuard] },
  { path: 'productos', component: ProductosInicioComponent, canActivate: [AutenticacionGuard] },
  { path: 'solicitudes', loadChildren: () => import('./solicitudes/solicitudes.module').then((m) => m.SolicitudesModule), canActivate: [AutenticacionGuard] },
  { path: 'autorizaciones', component: AutorizacionesInicioComponent, canActivate: [AutenticacionGuard] },
  { path: 'facturacion', component: FacturacionInicioComponent, canActivate: [AdminGuard] },
  { path: 'tickets', component: TicketsInicioComponent, canActivate: [AdminGuard] },
  { path: 'usuarios', component: UsuariosInicioComponent },
  { path: 'noAutorizado', component: SoloPersonalAutorizadoComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
