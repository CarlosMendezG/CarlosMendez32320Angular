import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { Cliente } from 'src/app/models/cliente';
import { ClienteState } from 'src/app/models/cliente.state';
import { Sesion } from 'src/app/models/sesion';
import { Estados } from 'src/app/models/states';
import { TipoUsuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { SesionService } from 'src/app/services/sesion.service';
import { inicializarClientes, loadClientes, loadClientesFailure, loadClientesSuccess } from '../../state/clientes.actions';
import { selectStateCliente, selectStateEstado } from '../../state/clientes.selectors';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit, OnDestroy {
  public esAdmin: boolean = false;
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesion>;
  public sesion: Sesion = { activa: false, usuario: undefined };
  public estadoCliente: Estados = Estados.sinInicializar;
  public clientes$!: Observable<Cliente[]>;
  public cargando$!: Observable<boolean>;
  public clientesSubscribe!: Subscription;
  public filtro: string = "";
  public error: Error | undefined;
  private inicializado: boolean = false;

  // @Input()
  // public clientesOrigen: Clientes[] = [];
  public clientes: Cliente[] = [];

  public columnas: string[] = ['id', 'nombre', 'rfc', 'regimenFiscal', 'cp', 'correo', 'responsable', 'comentarios', 'tieneUnidad', 'acciones'];
  public dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>(this.clientes);
  public clickedRows: Set<Cliente> = new Set<Cliente>();
  // private merge$!: Observable<any>;
  private href: string = "";
  private timer: any | undefined = undefined;

  @Output()
  public clienteEditar = new EventEmitter<number>();

  constructor(
    private dialog: MatDialog,
    private clientesService: ClientesService,
    private sesionServicio: SesionService,
    private router: Router,
    private store: Store<ClienteState>
  ) {
    this.sesion$ = this.sesionServicio.obtenerSesion().pipe(
      map((sesion: Sesion) => this.sesion = sesion)
    );
  }

  public editarCliente(clienteId: number) {
    console.log(`Solicitud de modificación del cliente por ruta: ${clienteId}`);
    this.clientesService.seleccionarClienteActual(clienteId);
    this.router.navigate(['clientes', 'cliente']);
  }

  @Output()
  public detalleClientes = new EventEmitter<number>();
  public detalleCliente(clienteId: number) {
    console.log(`Solicitud de detalle del cliente por ruta: ${clienteId}`);
    this.clientesService.seleccionarClienteActual(clienteId);
    this.router.navigate(['clientes', 'detalle']);
  }

  public eliminarClienteClick(clienteAEliminar: number) {
    if (!this.esAdmin) {
      alert('Procedimiento solo para administradores');
      return;
    }
    let indexCliente: number = this.clientes.findIndex(x => x.id == clienteAEliminar);
    if (indexCliente < 0) {
      this.dialog.open(ErrorComponent, {
        data: "No se puede localizar al cliente seleccionado",
        width: '350px'
      });
      return;
    }
    let clienteActual: Cliente = this.clientes[indexCliente];
    const dialogRef = this.dialog.open(DialogComponent, {
      data: clienteActual,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result}`);
      if (clienteActual.cliente != result) return;
      this.clientesSubscribe = this.clientesService.eliminarClienteHttp(clienteAEliminar).subscribe(
        (resultado: Cliente) => {
          this.store.dispatch(inicializarClientes());
          this.cargarClientes();
          console.log("datos actualizados");
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
    });
  }

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    return;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private cargarClientes() {
    this.store.select(selectStateEstado).pipe(
      map((estado: Estados) => {
        this.estadoCliente = estado;
        clearTimeout(this.timer);
        if (estado == Estados.cargando) {
          this.timer = setTimeout(() => {
            this.cargarClientes();
          }, 1500);
          return;
        }
        if (estado == Estados.datosCargados) {
          if (this.inicializado) return;
        } else {
          this.store.dispatch(loadClientes());
          this.clientes$ = this.clientesService.obtenerClientesHttp();
        }
        this.inicializado = true;
        this.clientes$.subscribe({
          next: (clientes: Cliente[]) => {
            this.store.dispatch(loadClientesSuccess({ clientes }));
            this.clientes = clientes;
            this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (error: any) => {
            this.store.dispatch(loadClientesFailure(error));
          }
        });
      })
    ).subscribe(() => {
      return;
      console.log("Cargar estado del cliente");
    });
  }

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
    this.clickedRows = new Set<Cliente>();

    this.href = this.router.url;

    this.inicializado = false;
    this.clientes$ = this.store.select(selectStateCliente);
    this.cargarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.clientesSubscribe) this.clientesSubscribe.unsubscribe();
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe();
  }

}
