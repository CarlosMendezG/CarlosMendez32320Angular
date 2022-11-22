import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteState } from 'src/app/models/cliente.state';
import { ClientesService } from 'src/app/services/clientes.service';
import { clientesInicializar } from '../../state/clientes.actions';

@Component({
  selector: 'app-clientes-inicio',
  templateUrl: './clientes-inicio.component.html',
  styleUrls: ['./clientes-inicio.component.scss']
})
export class ClientesInicioComponent implements OnInit, OnDestroy {

  constructor(
    private clientesService: ClientesService,
    private storeClientes: Store<ClienteState>    
  ) { }

  public clientes$!: Observable<Cliente[]>;
  public clientesSubscribe!: Subscription;
  public filtro: string = "";
  public error: Error | undefined;

  public editarCliente(clienteActual: number) {
    this.clientesService.seleccionarClienteActual(clienteActual);
    this.menuSeleccionadoCliente = "Clientes";
  }

  public detalleClientes(clienteActual: number) {
    this.clientesService.seleccionarClienteActual(clienteActual);
    this.menuSeleccionadoCliente = "Detalle";
  }

  public menuSeleccionadoCliente: string = "ListadoClientes";
  public cambioMenuClienteSeleccionado(menuCliente: string) {
    this.menuSeleccionadoCliente = menuCliente;
  }

  public mostrarDatosCliente: boolean = false;
  public cambioMostrarDatosCliente(mostrarDatos: boolean) {
    this.mostrarDatosCliente = mostrarDatos;
  }

  private cargarClientes() {
    this.clientes$ = this.clientesService.obtenerClientesHttp();
  }

  ngOnInit(): void {
    this.storeClientes.dispatch(clientesInicializar());
    this.cargarClientes();
  }

  ngOnDestroy() {
    if (this.clientesSubscribe) this.clientesSubscribe.unsubscribe();
  }

}
