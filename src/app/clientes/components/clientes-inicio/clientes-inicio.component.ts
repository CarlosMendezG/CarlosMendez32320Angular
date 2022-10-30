import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-inicio',
  templateUrl: './clientes-inicio.component.html',
  styleUrls: ['./clientes-inicio.component.scss']
})
export class ClientesInicioComponent implements OnInit, OnDestroy {

  constructor(
    private clientesService: ClientesService
  ) {
    // this.clientesSubscription = clientesService.obtenerClientesBehaviorSubject().subscribe({
    //   next: (clientes: Cliente[]) => {
    //     this.clientes = clientes;
    //     console.log(`Clientes cargados Observable: ${this.clientes}`);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // });

  }

  // private clientesSubscription: Subscription;
  // public clientes: Cliente[] = [];
  // public clientes$: Observable<Cliente[]> = this.clientesService.obtenerClientesBehaviorSubject();
  public clientes$!: Observable<Cliente[]>;
  public clientesSubscribe!: Subscription;
  public filtro: string = "";
  public error: Error | undefined;

  public editarCliente(clienteActual: number) {
    console.log(`Editando cliente: ${clienteActual}`);
    this.clientesService.seleccionarClienteActual(clienteActual);
    this.menuSeleccionadoCliente = "Clientes";
  }

  public detalleClientes(clienteActual: number) {
    console.log(`Detalle cliente: ${clienteActual}`);
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
    this.cargarClientes();
  }

  ngOnDestroy() {
    if (this.clientesSubscribe) this.clientesSubscribe.unsubscribe();
  }

}
