import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { DialogComponent } from './components/dialog/dialog.component';



@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    PaginaNoEncontradaComponent,
    LoginComponent,
    ErrorComponent,
    DialogComponent

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class CoreModule { }
