import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';
import { ClienteState } from 'src/app/models/cliente.state';
import { Sesion } from 'src/app/models/sesion';
import { Estados } from 'src/app/models/states';
import { TipoUsuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { SesionService } from 'src/app/services/sesion.service';
import { inicializarClientes, loadClientesFailure, loadClientesSuccess } from '../../state/clientes.actions';
import { selectStateCliente, selectStateEstado } from '../../state/clientes.selectors';

@Component({
  selector: 'app-clientes-cards',
  templateUrl: './clientes-cards.component.html',
  styleUrls: ['./clientes-cards.component.scss']
})
export class ClientesCardsComponent implements OnInit, OnDestroy {
  public esAdmin: boolean = false;
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesion>;
  public sesion: Sesion = { activa: false, usuario: undefined };
  public estadoCliente: Estados = Estados.sinInicializar;
  public clientes$!: Observable<Cliente[]>;
  public clientesSubscribe!: Subscription;
  public filtro: string = "";
  public error: Error | undefined;
  public Estados = Estados;

  constructor(
    private clientesService: ClientesService,
    private sesionServicio: SesionService,
    private router: Router,
    private store: Store<ClienteState>
  ) {
    this.sesion$ = this.sesionServicio.obtenerSesion().pipe(
      map((sesion: Sesion) => this.sesion = sesion)
    );
  }

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
    if (!this.esAdmin) {
      alert('Procedimiento solo para administradores');
      return;
    }
    this.store.dispatch(inicializarClientes());
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
    this.clientesService.obtenerClientesHttp().subscribe({
      next: (clientes: Cliente[]) => {
        this.store.dispatch(loadClientesSuccess({ clientes }))
      },
      error: (error: any) => {
        this.store.dispatch(loadClientesFailure(error));
      }
    });
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
    this.esAdmin = false;
    this.sesionSubscription = this.sesionServicio.obtenerSesion().subscribe(
      (sesion: Sesion) => {
        console.log('Sesión cargada');
        this.sesion = sesion;
        this.esAdmin = this.sesion && this.sesion.activa && (this.sesion.usuario?.tipoUsuario == TipoUsuario.top || this.sesion.usuario?.tipoUsuario == TipoUsuario.administrador);
      }, (err: Error) => {
        console.error(err);
      }, () => {
        this.sesionSubscription.unsubscribe;
      }
    );

    this.clientes$ = this.store.select(selectStateCliente);
    this.store.select(selectStateEstado).pipe(
      map((estado: Estados) => {
        this.estadoCliente = estado;
        if (estado == Estados.datosCargados) {
          return;
        }
        if (estado == Estados.cargando) {
          setTimeout(() => {
            this.ngOnInit();
          }, 1500);
          return;
        }
        this.cargarClientes();
      })
    ).subscribe(() => {
      return;
      console.log("Cargar estado del cliente");
    });
  }

  ngOnDestroy(): void {
    if (this.clientesSubscribe) this.clientesSubscribe.unsubscribe();
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe();
  }

}
