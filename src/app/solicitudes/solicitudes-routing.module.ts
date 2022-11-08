import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AutenticacionGuard } from '../core/guards/autenticacion.guard';
import { SolicitudInicioComponent } from './components/solicitud-inicio/solicitud-inicio.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  {
    path: '', component: SolicitudInicioComponent, children: [
      { path: 'solicitudes', component: SolicitudesComponent },
      { path: 'solicitud', component: SolicitudComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }