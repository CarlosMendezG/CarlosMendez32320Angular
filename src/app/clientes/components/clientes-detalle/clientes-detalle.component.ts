import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cliente } from 'src/app/models/cliente';
import { ClienteState } from 'src/app/models/cliente.state';
import { obtenerCliente } from '../../state/clientes.selectors';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss']
})
export class ClientesDetalleComponent implements OnInit, OnDestroy {

  public cliente: Cliente | undefined = undefined;
  public error: Error | undefined;

  constructor(
    private storeClientes: Store<ClienteState>
  ) { }

  ngOnInit(): void {
    this.storeClientes.select(obtenerCliente).subscribe((cliente: Cliente) => {      
      this.cliente = cliente;
    });
  }

  ngOnDestroy(): void {

  }

}
