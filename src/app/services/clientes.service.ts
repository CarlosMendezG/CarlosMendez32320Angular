import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes: Cliente[] = [];   // --> API 
  private clienteActivo: number = 0;  // --> usuario activo
  private clientes$: Observable<Cliente[]>;  // $ => Observable  
  private clientesSubject: BehaviorSubject<Cliente[]>;
  private urlPrefijo: string = "/Clientes";

  constructor(
    private http: HttpClient
  ) {
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

  seleccionarClienteActual(clienteActual: number) { // : Cliente | undefined
    if (clienteActual == 0) {
      this.clienteActivo = clienteActual;
      return; // undefined;
    }
    if (this.clientes.length < 1 || clienteActual <= 0) {
      this.clienteActivo = 0;
      return; // undefined;
    }
    // let index = this.clientes.findIndex(x => x.id == clienteActual);
    // if (index < 0) return undefined;
    this.clienteActivo = clienteActual;
    // return this.clientes[index];
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

  // ========================================================================= HTTP

  obtenerClientesHttp(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.api}${this.urlPrefijo}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    )
  }

  obtenerClienteHttp(id: number): Observable<Cliente> {
    if (id == 0) {
      if (this.clienteActivo <= 0) this.clienteActivo = 1;
      id = this.clienteActivo;
    }
    let url = `${environment.api}${this.urlPrefijo}/${id}`;
    return this.http.get<Cliente>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    );
    // .subscribe(
    //   (resultado) => {
    //     console.log(resultado);
    //     return resultado;
    //   }
    // )
    // return undefined;
  }

  agregarClienteHttp(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.api}${this.urlPrefijo}/`, cliente, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    );
  }

  modificarClienteHttp(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.api}${this.urlPrefijo}/${cliente.id}`, cliente).pipe(
      catchError(this.manejarError)
    );
  }

  eliminarClienteHttp(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${environment.api}${this.urlPrefijo}/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('Error del lado del cliente', error.error.message);
    } else {
      console.warn('Error del lado del servidor', error.error.message);
    }

    return throwError(() => new Error('Error en la comunicación HTTP'));
  }
}
