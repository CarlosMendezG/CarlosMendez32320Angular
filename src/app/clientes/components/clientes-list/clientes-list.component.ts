import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { selectSesiónActiva } from 'src/app/core/state/sesion.selectors';
import { Cliente } from 'src/app/models/cliente';
import { ClienteState } from 'src/app/models/cliente.state';
import { Sesión } from 'src/app/models/sesión';
import { TipoUsuario, Usuario } from 'src/app/models/usuario';
import { clientesEliminar, clientesSeleccionar } from '../../state/clientes.actions';
import { selectClientes } from '../../state/clientes.selectors';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit, OnDestroy {
  public usuario!: Usuario;
  public filtro: string = "";
  public error: Error | undefined;
  
  public columnas: string[] = ['id', 'nombre', 'rfc', 'regimenFiscal', 'cp', 'correo', 'responsable', 'comentarios', 'tieneUnidad', 'acciones'];
  public dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>([]);
  public clickedRows: Set<Cliente> = new Set<Cliente>();
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private storeClientes: Store<ClienteState>,
    private storeSesión: Store<Sesión>
  ) { }

  public editarCliente(clienteId: number) {    
    if (this.usuario.tipoUsuario != TipoUsuario.administrador && this.usuario.tipoUsuario != TipoUsuario.top) { 
      alert('Procedimiento solo para administradores');
      return;
    }
    this.storeClientes.dispatch(clientesSeleccionar( {seleccionado: clienteId}));
    this.router.navigate(['clientes', 'cliente']);
  }

  public detalleCliente(clienteId: number) {
    this.storeClientes.dispatch(clientesSeleccionar( {seleccionado: clienteId} ));
    this.router.navigate(['clientes', 'detalle']);
  }

  public eliminarClienteClick(clienteAEliminar: number, nombreCliente: string) {
    if (!this.usuario) {
      alert('Procedimiento solo para administradores registrados');
      return;
    }
    if (this.usuario.tipoUsuario != TipoUsuario.administrador && this.usuario.tipoUsuario != TipoUsuario.top) {
      alert('Procedimiento solo para administradores');
      return;
    }
    let clienteActual: Cliente = {id: clienteAEliminar, cliente: nombreCliente, rfc: '', regimenFiscal: '', cp: '', correo: '', comentarios: '', idNEWeb: '', responsable: ''};    
    const dialogRef = this.dialog.open(DialogComponent, {
      data: clienteActual,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (clienteActual.cliente != result) return;
      this.storeClientes.dispatch(clientesEliminar({ cliente: clienteActual }));
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
    this.storeClientes.select(selectClientes).subscribe((clientes: Cliente[]) => {
      this.dataSource = new MatTableDataSource<Cliente>(clientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.storeSesión.select(selectSesiónActiva).subscribe((sesión: Sesión) => {
      if (!sesión.activa || !sesión.usuario) {
        this.router.navigate(['noAutorizado']);
        return;
      }
      this.usuario = sesión.usuario;
    });
    this.cargarClientes();
    this.clickedRows = new Set<Cliente>();    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {    
  }

}
