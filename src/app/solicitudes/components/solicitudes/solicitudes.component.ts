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

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit, OnDestroy {

  public solicitudes: SolicitudInfo[] = [];
  public solicitudes$!: Observable<SolicitudInfo[]>;
  public solicitudSubscribe!: Subscription;
  public filtro: string = "";
  public error: Error | undefined;
  public esCurso: boolean = false;
  public esListado: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public columnas: string[] = ['id', 'nombre', 'rfc', 'regimenFiscal', 'cp', 'correo', 'responsable', 'comentarios', 'tieneUnidad', 'acciones'];
  public dataSource: MatTableDataSource<SolicitudInfo> = new MatTableDataSource<SolicitudInfo>(this.solicitudes);
  public clickedRows: Set<SolicitudInfo> = new Set<SolicitudInfo>();

  public tipoMovimiento = $tipoMovimiento;
  public tipoPago = $tipoPago;

  constructor(
    private dialog: MatDialog,
    private solicitudesServicio: SolicitudesService,
    private router: Router
  ) { }

  public cargarSolicitudes() {
    this.solicitudes$ = this.solicitudesServicio.obtenerSolicitudes();
    this.solicitudes$.subscribe(
      (solicitudes: SolicitudInfo[]) => {
        this.solicitudes = solicitudes;
        this.dataSource = new MatTableDataSource<SolicitudInfo>(this.solicitudes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    return;
  }

  public seleccionarSolicitud(idSolicitud: number) {
    // this.router.navigate(['solicitudes/solicitud']);
  }

  public nuevaSolicitud() {
    if (this.esCurso) {

    } else {

    }
  }

  public eliminarSolicitud(solicitudAEliminar: number) {
    let indexSolicitud: number = this.solicitudes.findIndex(x => x.id == solicitudAEliminar);
    if (indexSolicitud < 0) {
      this.dialog.open(ErrorComponent, {
        data: "No se puede localizar al cliente seleccionado",
        width: '350px'
      });
      return;
    }
    let clienteActual: SolicitudInfo = this.solicitudes[indexSolicitud];
    const dialogRef = this.dialog.open(DialogComponent, {
      data: clienteActual,
      width: '350px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`The dialog was closed ${result}`);
    //   if (clienteActual.cliente != result) return;
    //   this.solicitudesSubscribe = this.solicitudesService.eliminarSolicitudHttp(solicitudAEliminar).subscribe(
    //     (resultado: Solicitud) => {
    //       this.cargarSolicitudes();
    //     }, (err: Error) => {
    //       console.error(err);
    //       this.error = err;
    //       setTimeout(() => {
    //         this.error = undefined;
    //       }, 15000);
    //     }, () => {
    //       this.solicitudesSubscribe.unsubscribe;
    //     }
    //   );
    // });

  }


  ngOnInit(): void {
    this.clickedRows = new Set<SolicitudInfo>();
    this.esCurso = environment.curso;
    this.cargarSolicitudes();
  }

  ngOnDestroy() {
    if (this.solicitudSubscribe) this.solicitudSubscribe.unsubscribe();
  }

}
