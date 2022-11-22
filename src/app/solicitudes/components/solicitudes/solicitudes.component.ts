import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { SolicitudInfo } from 'src/app/models/solicitudInfo';
import { $tipoMovimiento } from 'src/app/models/tipoMovimiento';
import { $tipoPago } from 'src/app/models/tipoPago';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Sesión } from 'src/app/models/sesión';
import { SesiónService } from 'src/app/services/sesión.service';
import { TipoUsuario } from 'src/app/models/usuario';
import { CVFechaT } from 'src/app/core/funciones/fFecha';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit, OnDestroy {
  public esAdmin: boolean = false;
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesión>;
  public sesion: Sesión = { activa: false, usuario: undefined };
  public solicitudes: SolicitudInfo[] = [];
  public solicitudesOrigen: SolicitudInfo[] = [];
  public solicitudes$!: Observable<SolicitudInfo[]>;
  public solicitudSubscribe!: Subscription;
  public filtro: string = '';
  public filtroCampo: string = '';
  public orderBy: string = '';
  public orderByDesc: boolean = true;
  public error: Error | undefined;
  public esCurso: boolean = false;
  public esListado: boolean = false;
  public soloMostrarSinAsignar: boolean = false;
  public aplicarFiltroTimeout: any | undefined = undefined;
  public cargado: boolean = false;
  public TipoUsuario = TipoUsuario;
  public filtrarPor = $filtrarPor;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public columnas: string[] = [
    'id',
    'asignadoA',
    'cliente',
    'correo',
    'aplicacion',
    'fechaRegistro',
    'pagoTipo',
    'pagoFecha',
    'pagoReferencia',
    'pagoImporte',
    'observaciones',
    'acciones',
  ];
  public dataSource: MatTableDataSource<SolicitudInfo> =
    new MatTableDataSource<SolicitudInfo>(this.solicitudes);
  public clickedRows: Set<SolicitudInfo> = new Set<SolicitudInfo>();

  public tipoMovimiento = $tipoMovimiento;
  public tipoPago = $tipoPago;

  constructor(
    private solicitudesServicio: SolicitudesService,
    private sesionServicio: SesiónService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.sesion$ = this.sesionServicio.obtenerSesión().pipe(
      map((sesion: Sesión) => this.sesion = sesion)
    );
  }

  public cargarSolicitudes() {
    this.cargado = false;
    this.solicitudes$ = this.solicitudesServicio.obtenerSolicitudes();
    this.aplicarFiltros();
  }

  public aplicarFiltro(event: Event) {
    let filtro: string = (event.target as HTMLInputElement).value;
    if (this.filtro == filtro) return;
    this.filtro = filtro;
    this.cargado = false;
    if (this.aplicarFiltroTimeout) clearTimeout(this.aplicarFiltroTimeout);
    this.aplicarFiltroTimeout = setTimeout(() => {
      this.aplicarFiltros();
      this.aplicarFiltroTimeout = undefined;
    }, 700);
  }

  public aplicarFiltros() {
    this.cargado = false;
    this.solicitudes$.subscribe((solicitudes: SolicitudInfo[]) => {
      if (this.aplicarFiltroTimeout) clearTimeout(this.aplicarFiltroTimeout);
      this.solicitudes = solicitudes.filter((solicitud: SolicitudInfo) => {
        solicitud.fechaRegistro = CVFechaT(solicitud.fechaRegistroTxt);
        solicitud.datoFecha = CVFechaT(solicitud.datoFechaTxt);
        solicitud.pagoFecha = CVFechaT(solicitud.pagoFechaTxt);
        return this.filtrarSolicitudes(solicitud);
      }).sort((a, b) => this.sortSolicitudes(a, b));

      this.dataSource = new MatTableDataSource<SolicitudInfo>(this.solicitudes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cargado = true;
    });
  }

  private filtrarSolicitudes(solicitud: SolicitudInfo): boolean {
    if (!this.sesion.activa || !this.sesion.usuario) return false;
    if (this.sesion.usuario.tipoUsuario == TipoUsuario.usuario) {
      if (+this.sesion.usuario.id != solicitud.ace_ClientId) return false;
    } else if (this.soloMostrarSinAsignar) {
      if (solicitud.asignadoA && this.sesion.usuario.id != solicitud.asignadoA) return false;
    }
    if (!this.filtro) return true;
    let filtro: string = this.filtro.toLowerCase();
    switch (this.filtroCampo.toLowerCase()) {
      case 'unidad':
        return solicitud.cliente.toLowerCase().includes(filtro);
        break;
      case 'correo':
        return solicitud.correoCliente.toLowerCase().includes(filtro);
        break;
      case 'asignadoA':
        return solicitud.usuarioAsignado.toLowerCase().includes(filtro);
        break;
      case 'aplicación':
        return solicitud.appNombre.toLowerCase().includes(filtro);
        break;
      case 'fechaRegistro':
        return solicitud.fechaRegistro.toLocaleDateString().toLowerCase().includes(filtro)
          || solicitud.fechaRegistro.toString().toLowerCase().toLocaleLowerCase().includes(filtro);
        break;
      case 'pagoTipo':
        if (!this.tipoPago[solicitud.pagoTipo]) return false;
        return this.tipoPago[solicitud.pagoTipo].toLowerCase().includes(filtro);
        break;
      case 'pagoImporte':
        return solicitud.pagoImporte.toFixed(2).toLowerCase().includes(filtro);
        break;
      default:
        if (!this.tipoPago[solicitud.pagoTipo]) {
          return solicitud.cliente.toLowerCase().includes(filtro)
            || solicitud.correoCliente.toLowerCase().includes(filtro)
            || solicitud.usuarioAsignado.toLowerCase().includes(filtro)
            || solicitud.appNombre.toLowerCase().includes(filtro)
            || solicitud.fechaRegistro.toLocaleDateString().toLowerCase().includes(filtro)
            || solicitud.fechaRegistro.toString().toLowerCase().toLocaleLowerCase().includes(filtro)
            || solicitud.pagoImporte.toFixed(2).toLowerCase().includes(filtro);
        }

        return solicitud.cliente.toLowerCase().includes(filtro)
          || solicitud.correoCliente.toLowerCase().includes(filtro)
          || solicitud.usuarioAsignado.toLowerCase().includes(filtro)
          || solicitud.appNombre.toLowerCase().includes(filtro)
          || solicitud.fechaRegistro.toLocaleDateString().toLowerCase().includes(filtro)
          || solicitud.fechaRegistro.toString().toLowerCase().toLocaleLowerCase().includes(filtro)
          || this.tipoPago[solicitud.pagoTipo].toLowerCase().includes(filtro)
          || solicitud.pagoImporte.toFixed(2).toLowerCase().includes(filtro);

        break;

    }
  }

  private sortSolicitudes(solicitud1: SolicitudInfo, solicitud2: SolicitudInfo): number {
    switch (this.orderBy) {
      case 'unidad':
        if (solicitud1.cliente != solicitud2.cliente) {
          if (this.orderByDesc) {
            return solicitud2.cliente.localeCompare(solicitud1.cliente);
          } else {
            return solicitud1.cliente.localeCompare(solicitud2.cliente);
          }
        }
        break;
      case 'correo':
        if (solicitud1.correoCliente != solicitud2.correoCliente) {
          if (this.orderByDesc) {
            return solicitud2.correoCliente.localeCompare(solicitud1.correoCliente);
          } else {
            return solicitud1.correoCliente.localeCompare(solicitud2.correoCliente);
          }
        }
        break;
      case 'asignadoA':
        if (solicitud1.usuarioAsignado != solicitud2.usuarioAsignado) {
          if (this.orderByDesc) {
            return solicitud2.usuarioAsignado.localeCompare(solicitud1.usuarioAsignado);
          } else {
            return solicitud1.usuarioAsignado.localeCompare(solicitud2.usuarioAsignado);
          }
        }
        break;
      case 'aplicación':
        if (solicitud1.appNombre != solicitud2.appNombre) {
          if (this.orderByDesc) {
            return solicitud2.appNombre.localeCompare(solicitud1.appNombre);
          } else {
            return solicitud1.appNombre.localeCompare(solicitud2.appNombre);
          }
        }
        break;
      case 'pagoTipo':
        if (solicitud1.pagoTipo != solicitud2.pagoTipo) {
          if (!this.tipoPago[solicitud2.pagoTipo]) return -1;
          if (this.tipoPago[solicitud2.pagoTipo]) return 0;
          if (this.orderByDesc) {
            return this.tipoPago[solicitud2.pagoTipo].localeCompare(this.tipoPago[solicitud1.pagoTipo]);
          } else {
            return this.tipoPago[solicitud1.pagoTipo].localeCompare(this.tipoPago[solicitud1.pagoTipo]);
          }
        }
        break;
      case 'pagoImporte':
        if (solicitud1.pagoImporte != solicitud2.pagoImporte) {
          if (this.orderByDesc) {
            return solicitud2.pagoImporte > solicitud1.pagoImporte ? -1 : 0;
          } else {
            return solicitud1.pagoImporte > solicitud2.pagoImporte ? -1 : 0;
          }
        }
        break;
      default:
        break;
    }
    if (this.sesion.usuario?.id == solicitud1.asignadoA) return -1;
    if (this.orderByDesc) {
      return solicitud1.fechaRegistro.getTime() > solicitud2.fechaRegistro.getTime() ? -1 : 0;
    } else {
      return solicitud2.fechaRegistro.getTime() > solicitud1.fechaRegistro.getTime() ? -1 : 0;
    }
  }

  public seleccionarSolicitud(idSolicitud: number) {
    if (this.esCurso) {
      this.router.navigate([`solicitudes/editar/${idSolicitud}`]);
      return;
    }
    this.router.navigate(['solicitudes/solicitud']);
  }

  public editarSolicitud(idSolicitud: number) {
    this.router.navigate([`solicitudes/editar/${idSolicitud}`]);
  }

  public nuevaSolicitud() {
    this.router.navigate([`solicitudes/editar`]);
  }

  public eliminarSolicitud(solicitudAEliminar: number) {
    if (!this.esAdmin) {
      alert('Procedimiento solo para administradores');
      return;
    }

    let indexSolicitud: number = this.solicitudes.findIndex(
      (x) => x.id == solicitudAEliminar
    );
    if (indexSolicitud < 0) {
      this.dialog.open(ErrorComponent, {
        data: 'No se puede localizar al cliente seleccionado',
        width: '350px',
      });
      return;
    }
    let clienteActual: SolicitudInfo = this.solicitudes[indexSolicitud];
    const dialogRef = this.dialog.open(DialogComponent, {
      data: clienteActual,
      width: '350px',
    });
  }

  ngOnInit(): void {
    this.esAdmin = false;
    this.sesionSubscription = this.sesionServicio.obtenerSesión().subscribe(
      (sesion: Sesión) => {
        this.sesion = sesion;
        this.esAdmin = this.sesion && this.sesion.activa && (this.sesion.usuario?.tipoUsuario == TipoUsuario.top || this.sesion.usuario?.tipoUsuario == TipoUsuario.administrador);
      }, (err: Error) => {
        
      }, () => {
        this.sesionSubscription.unsubscribe;
      }
    );

    this.cargado = false;
    this.clickedRows = new Set<SolicitudInfo>();
    this.esCurso = environment.curso;
    this.cargarSolicitudes();
  }

  ngOnDestroy() {
    if (this.solicitudSubscribe) this.solicitudSubscribe.unsubscribe();
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe();
  }
}

const $filtrarPor: { [key: string]: string } = {
  "id": "Id",
  "asignadoA": "Asignado a",
  "unidad": "Cliente",
  "cliente": "Cliente",
  "correo": "Correo",
  "aplicacion": "Aplicación",
  "fechaRegistro": "Fecha de registro",
  "pagoTipo": "Tipo de pago",
  "pagoFecha": "Fecha de pago",
  "pagoReferencia": "Referencia de pago",
  "pagoImporte": "Importe del pago",
  "observaciones": "Observaciones",
  "": ""
}