import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosModule } from './productos/productos.module';
import { DistribuidoresModule } from './distribuidores/distribuidores.module';
import { AutorizacionesModule } from './autorizaciones/autorizaciones.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { TicketsModule } from './tickets/tickets.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    DistribuidoresModule,
    ProductosModule,
    SolicitudesModule,
    AutorizacionesModule,
    FacturacionModule,
    TicketsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
