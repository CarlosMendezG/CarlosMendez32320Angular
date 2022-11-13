import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { UsuariosEditarComponent } from './components/usuarios-editar/usuarios-editar.component';
import { UsuariosInicioComponent } from './components/usuarios-inicio/usuarios-inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '', component: UsuariosInicioComponent, children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'editar', component: UsuariosEditarComponent, canActivate: [AdminGuard] },
      { path: 'editar/:id', component: UsuariosEditarComponent, canActivate: [AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
