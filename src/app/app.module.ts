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

@NgModule({
  declarations: [
    AppComponent
  ],
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
