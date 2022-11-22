import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MenuInicialComponent } from './components/menu-inicial/menu-inicial.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SoloPersonalAutorizadoComponent } from './components/solo-personal-autorizado/solo-personal-autorizado.component';
import { SesiónEffects } from './state/sesión.effects';
import { sesiónFeatureKey, reducer } from './state/sesión.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    PaginaNoEncontradaComponent,
    ErrorComponent,
    DialogComponent,
    MenuInicialComponent,
    LoginComponent,
    SoloPersonalAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,    
    StoreModule.forFeature(sesiónFeatureKey, reducer),
    EffectsModule.forFeature([SesiónEffects])
  ],
  exports: [
    ToolbarComponent,
    MenuInicialComponent,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
