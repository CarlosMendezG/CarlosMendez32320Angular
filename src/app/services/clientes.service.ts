import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes: Cliente[] = [];   // --> API 
  private clienteActivo: number = 0;  // --> usuario activo
  private clientes$: Observable<Cliente[]>;  // $ => Observable  
  private clientesSubject: BehaviorSubject<Cliente[]>;

  constructor() {
    this.crearClientes();
    this.clientes$ = new Observable<Cliente[]>((suscriptor) => {
      suscriptor.next(this.clientes);
    })
    this.clientesSubject = new BehaviorSubject<Cliente[]>(this.clientes);
  }

  private crearClientes() {
    let cliente: Cliente = { id: 1, cliente: 'Cliente Juan Perez', correo: 'juan.perez@hotmail.com', rfc: '', regimenFiscal: '625', cp: '45040', responsable: '', comentarios: '', idNEWeb: '' }
    this.clientes.push(cliente);
    cliente = { id: 2, cliente: 'Cliente Artemis Kiwi', correo: 'artemis887@hotmail.com', rfc: '', regimenFiscal: '601', cp: '45040', responsable: '', comentarios: '', idNEWeb: '' }
    this.clientes.push(cliente);
    cliente = { id: 3, cliente: 'Cliente Luis Lopez', correo: 'luislopez@hotmail.com', rfc: '', regimenFiscal: '622', cp: '45040', responsable: '', comentarios: '', idNEWeb: '' }
    this.clientes.push(cliente);
    cliente = { id: 4, cliente: 'Cliente Martha Juarez', correo: 'marthajuarez@hotmail.com', rfc: '', regimenFiscal: '623', cp: '45040', responsable: '', comentarios: '', idNEWeb: '' }
    this.clientes.push(cliente);
  }

  obtenerClienteActual(): Cliente | undefined {
    if (this.clientes.length < 1 || this.clienteActivo <= 0) return undefined;
    let index = this.clientes.findIndex(x => x.id == this.clienteActivo);
    if (index < 0) return undefined;
    return this.clientes[index];
  }

  seleccionarClienteActual(clienteActual: number): Cliente | undefined {
    if (this.clientes.length < 1 || clienteActual <= 0) {
      this.clienteActivo = 0;
      return undefined;
    }
    let index = this.clientes.findIndex(x => x.id == clienteActual);
    if (index < 0) return undefined;
    this.clienteActivo = clienteActual;
    return this.clientes[index];
  }

  obtenerClientesAsync(): Promise<Cliente[]> {
    return new Promise((resolve, reject) => {
      if (this.clientes.length > 0) {
        resolve(this.clientes);
      } else {
        reject({
          codigo: 99,
          mensaje: 'No existen clientes cargados en la base de datos'
        });
      }
    });
  }

  obtenerClientesObservable(): Observable<Cliente[]> {
    return this.clientes$;
  }

  obtenerClientesBehaviorSubject(): Observable<Cliente[]> {
    return this.clientesSubject.asObservable();
  }

  agregarCliente(cliente: Cliente): Cliente | undefined {
    if (!cliente) return undefined;
    if (cliente.id || cliente.id === 0) {
      let i = this.clientes.length - 1;
      cliente.id = this.clientes[i].id + 1;
    }
    this.clientes.push(cliente);
    this.clientesSubject.next(this.clientes);
    return cliente;
  }

  eliminarCliente(clienteAEliminar: number) {
    // let index = this.clientes.findIndex(x => x.id == clienteAEliminar);
    // if (index < 0) {
    //   // error
    //   return;
    // }
    // this.clientes.splice(index, 1);

    this.clientes = this.clientes.filter(x => x.id != clienteAEliminar);
    this.clientesSubject.next(this.clientes);
  }

  modificarCliente(cliente: Cliente): Cliente | undefined {
    if (!cliente) {
      // error
      return undefined;
    }
    let index = this.clientes.findIndex(x => x.id == cliente.id);
    if (index < 0) {
      // error
      return undefined;
    }
    this.clientes[index] = cliente;
    this.clientesSubject.next(this.clientes);
    return cliente;
  }
}
