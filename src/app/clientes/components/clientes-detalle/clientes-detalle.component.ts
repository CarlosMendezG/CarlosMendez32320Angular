import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss']
})
export class ClientesDetalleComponent implements OnInit, OnDestroy {

  constructor(
    private clientesService: ClientesService
  ) { }

  public cliente: Cliente | undefined = undefined;
  public clienteSubscribe!: Subscription;
  public error: Error | undefined;

  private cargarDatosOriginales() {
    // this.cliente = this.clientesService.obtenerClienteHttp(0);

    this.clienteSubscribe = this.clientesService.obtenerClienteHttp(0).subscribe(
      (resultado: Cliente) => {
        this.cliente = resultado;
        if (!this.cliente) this.cliente = { id: 0, cliente: '', correo: '', rfc: '', regimenFiscal: '', cp: '', responsable: '', comentarios: '', idNEWeb: '' };
      }, (err: Error) => {
        console.error(err);
        this.error = err;
        setTimeout(() => {
          this.error = undefined;
        }, 15000);
      }, () => {
        this.clienteSubscribe.unsubscribe;
      }
    );
  }

  ngOnInit(): void {
    this.cargarDatosOriginales();
  }

  ngOnDestroy(): void {
    if (this.clienteSubscribe) this.clienteSubscribe.unsubscribe();
  }

}
