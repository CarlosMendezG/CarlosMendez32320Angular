import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionLoginComponent } from './components/autenticacion-login/autenticacion-login.component';
import { AutenticacionNuevoComponent } from './components/autenticacion-nuevo/autenticacion-nuevo.component';

const routes: Routes = [
  { path: 'login', component: AutenticacionLoginComponent },
  { path: 'nuevo', component: AutenticacionNuevoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
