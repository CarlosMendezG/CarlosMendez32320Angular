import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-inicio',
  templateUrl: './clientes-inicio.component.html',
  styleUrls: ['./clientes-inicio.component.scss']
})
export class ClientesInicioComponent implements OnInit {

  constructor(
    private clientesService: ClientesService
  ) {
    this.clientesSubscription = clientesService.obtenerClientesBehaviorSubject().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(`Clientes cargados Observable: ${this.clientes}`);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private clientesSubscription: Subscription;
  public clientes: Cliente[] = [];
  public clientes$: Observable<Cliente[]> = this.clientesService.obtenerClientesBehaviorSubject();

  public editarCliente(clienteActual: number) {
    this.clientesService.seleccionarClienteActual(clienteActual);
    this.menuSeleccionadoCliente = "Clientes";
  }
  public menuSeleccionadoCliente: string = "ListadoClientes";
  public cambioMenuClienteSeleccionado(menuCliente: string) {
    this.menuSeleccionadoCliente = menuCliente;
  }

  public mostrarDatosCliente: boolean = true;
  public cambioMostrarDatosCliente(mostrarDatos: boolean) {
    this.mostrarDatosCliente = mostrarDatos;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.clientesSubscription.unsubscribe();
  }

}
