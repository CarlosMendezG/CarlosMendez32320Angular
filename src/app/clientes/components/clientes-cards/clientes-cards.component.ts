import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-cards',
  templateUrl: './clientes-cards.component.html',
  styleUrls: ['./clientes-cards.component.scss']
})
export class ClientesCardsComponent implements OnInit, OnDestroy {

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {
    // this.clientes$ = this.clientesService.obtenerClientesBehaviorSubject();
    // console.log(this.clientes$);
  }

  public clientes$!: Observable<Cliente[]>;
  public clientesSubscribe!: Subscription;
  public filtro: string = "";
  public error: Error | undefined;

  @Output()
  public clienteEditar = new EventEmitter<number>();
  public editarCliente(clienteId: number) {
    if (this.href == '/clientes') {
      console.log(`Solicitud de modificación del cliente por output: ${clienteId}`);
      this.clienteEditar.emit(clienteId);
      return;
    }
    console.log(`Solicitud de modificación del cliente por ruta: ${clienteId}`);
    this.clientesService.seleccionarClienteActual(clienteId);
    this.router.navigate(['clientes', 'cliente']);
  }

  @Output()
  public detalleClientes = new EventEmitter<number>();
  public detalleCliente(clienteId: number) {
    if (this.href == '/clientes') {
      console.log(`Solicitud de detalle del cliente por output: ${clienteId}`);
      this.detalleClientes.emit(clienteId);
      return;
    }
    console.log(`Solicitud de detalle del cliente por ruta: ${clienteId}`);
    this.clientesService.seleccionarClienteActual(clienteId);
    this.router.navigate(['clientes', 'detalle']);
  }

  public eliminarClienteClick(clienteId: number) {
    this.clientesSubscribe = this.clientesService.eliminarClienteHttp(clienteId).subscribe(
      (resultado: Cliente) => {
        this.cargarClientes();
      }, (err: Error) => {
        console.error(err);
        this.error = err;
        setTimeout(() => {
          this.error = undefined;
        }, 15000);
      }, () => {
        this.clientesSubscribe.unsubscribe;
      }
    );
  }

  private cargarClientes() {
    this.clientes$ = this.clientesService.obtenerClientesHttp();
  }

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value.toLowerCase();
    this.clientes$.pipe(
      map((clientes: Cliente[]) => clientes.filter((cliente: Cliente) => cliente.cliente.toLowerCase().includes(valorFiltro)))
    ).subscribe((clientes) => {
      console.log("filtro aplicado a rxjs cards");
    });
  }

  private href: string = "";
  ngOnInit(): void {
    this.href = this.router.url;
    this.cargarClientes();
  }

  ngOnDestroy(): void {
    if (this.clientesSubscribe) this.clientesSubscribe.unsubscribe();
  }

}
