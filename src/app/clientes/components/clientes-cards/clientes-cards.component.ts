import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-cards',
  templateUrl: './clientes-cards.component.html',
  styleUrls: ['./clientes-cards.component.scss']
})
export class ClientesCardsComponent implements OnInit {

  constructor(
    private clientesService: ClientesService
  ) {
    this.clientes$ = this.clientesService.obtenerClientesBehaviorSubject();
    console.log(this.clientes$);
  }

  public clientes$: Observable<Cliente[]>;
  public filtro: string = "";

  @Output()
  public clienteEditar = new EventEmitter<number>();
  public editarCliente(clienteId: number) {
    this.clienteEditar.emit(clienteId);
  }

  public eliminarClienteClick(clienteId: number) {
    this.clientesService.eliminarCliente(clienteId);
  }

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value.toLowerCase();
    this.clientes$.pipe(
      map((clientes: Cliente[]) => clientes.filter((cliente: Cliente) => cliente.cliente.toLowerCase().includes(valorFiltro)))
    ).subscribe((clientes) => {
      console.log("filtro aplicado a rxjs cards");
    });
  }

  ngOnInit(): void {
    let a = 1;
  }

}
