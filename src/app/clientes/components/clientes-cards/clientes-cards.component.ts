import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  selector: 'app-clientes-cards',
  templateUrl: './clientes-cards.component.html',
  styleUrls: ['./clientes-cards.component.scss']
})
export class ClientesCardsComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public usuario!: Usuario;
  public clientes!: Cliente[];
  public filtro: string = "";
  public error: Error | undefined;

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
    this.storeClientes.dispatch(clientesSeleccionar( {seleccionado: clienteId} ));
    this.router.navigate(['clientes', 'cliente']);
  }

  public detalleCliente(clienteId: number) {
    this.storeClientes.dispatch(clientesSeleccionar( {seleccionado: clienteId} ));
    this.router.navigate(['clientes', 'detalle']);
  }

  public eliminarClienteClick(clienteAEliminar: number, nombreCliente: string) {
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

  private cargarClientes() {
    this.storeClientes.select(selectClientes).subscribe((clientes: Cliente[]) => {
      this.cargando = false;
      if (this.filtro) {
        this.clientes = clientes.filter((cliente: Cliente) => cliente.cliente.toLowerCase().includes(this.filtro))
        return;
      }
      this.clientes = clientes;
    });
  }

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtro = valorFiltro;
    this.cargarClientes();    
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
  }

  ngOnDestroy(): void {
  }

}
