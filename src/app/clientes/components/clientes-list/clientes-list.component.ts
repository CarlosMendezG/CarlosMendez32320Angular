import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable, of, from, interval } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private clientesService: ClientesService
  ) {
    clientesService.obtenerClientesAsync().then(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(`Clientes cargados Promesa: ${this.clientes}`);
        // console.log(`Clientes originales por Input: ${this.clientesOrigen}`);
      }).catch((error: { codigo: number, mensaje: string }) => {
        console.log(`Error: código ${error.codigo} -> ${error.mensaje}. Clientes: ${this.clientes}`);
        // console.log(`Clientes originales por Input: ${this.clientesOrigen}`);
      });

    this.clientesSubscription = clientesService.obtenerClientesObservable().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(`Clientes cargados Observable: ${this.clientes}`);
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  public clientesSubscription: Subscription;

  // @Input()
  // public clientesOrigen: Clientes[] = [];
  public clientes: Cliente[] = [];

  @Output()
  public clienteEditar = new EventEmitter<number>();
  public editarCliente(clienteId: number) {
    this.clienteEditar.emit(clienteId);
  }

  // @Output()
  // public eliminarCliente = new EventEmitter<number>();
  public eliminarClienteClick(clienteAEliminar: number) {
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
      this.clientesService.eliminarCliente(clienteAEliminar);
      // this.clientes = this.clientesOrigen.filter(x => x.id != clienteAEliminar);
      // this.dataSource = new MatTableDataSource<Clientes>(this.clientes);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // this.eliminarCliente.emit(clienteId);
    });
  }

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    return;

    // this.dataSource.filterPredicate = function (cliente: Clientes, filtro: string) {
    //   return cliente.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    // };
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public columnas: string[] = ['id', 'nombre', 'rfc', 'regimenFiscal', 'cp', 'correo', 'responsable', 'comentarios', 'tieneUnidad'];
  public dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>(this.clientes);
  public clickedRows: Set<Cliente> = new Set<Cliente>();
  private merge$!: Observable<any>;

  ngOnInit(): void {
    // this.clientes = this.clientesOrigen;
    this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
    this.clickedRows = new Set<Cliente>();


    of(this.clientes).subscribe((clientes) => {
      console.log('Desde el of', clientes);
    });

    from(this.clientes).subscribe((clientes) => {
      console.log('Desde el from', clientes);
    });

    // pipe  es para todos los observables
    of(this.clientes).pipe(
      // filter((clientes: Clientes[]) => clientes.nombre == 'Carlos')
      map((clientes: Cliente[]) => clientes.filter((cliente: Cliente) => cliente.cliente == 'Carlos'))
    ).subscribe((clientes) => {
      console.log('Desde el of con filtro', clientes);
    });

    from(this.clientes).pipe(
      filter((cliente: Cliente) => cliente.cliente == 'Carlos')
    ).subscribe((clientes) => {
      console.log('Desde el from con filtro', clientes);
    });

    of(this.clientes).pipe(
      mergeMap(
        (clientes: Cliente[]) => interval(1000).pipe(map(i => i + clientes[i].cliente))
      )
    ).subscribe((clientes) => {
      console.log('Desde el of con mergeMap', clientes);
    });

    this.merge$ = of(['a', 'b', 'c', 'd']).pipe(
      mergeMap(
        letras => interval(2000).pipe(
          map((i) => i + letras[i])
        )
      )
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.clientesSubscription.unsubscribe();
    // this.merge$.unsubscribe();
  }

}
