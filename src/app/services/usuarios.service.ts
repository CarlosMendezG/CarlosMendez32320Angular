import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Usuario[] = [];
  private usuarioActivo: string | undefined = undefined;
  private usuarios$: Observable<Usuario[]>;  // $ => Observable  
  private usuarios$$: BehaviorSubject<Usuario[]>;
  private urlPrefijo: string = "/Usuarios";

  constructor(
    private http: HttpClient
  ) {
    this.crearUsuarios();
    this.usuarios$ = new Observable<Usuario[]>((suscriptor) => {
      suscriptor.next(this.usuarios);
    })
    this.usuarios$$ = new BehaviorSubject<Usuario[]>(this.usuarios);
  }

  private crearUsuarios() {
    let usuario: Usuario = { id: 'a1a1a1a1a1', nombre: 'Juan Perez', correo: 'juan.perez@hotmail.com', tipoUsuario: 0, logIn: new Date(2020, 1, 1) }
    this.usuarios.push(usuario);
    usuario = { id: 'a2a2a2a2a2a2a2', nombre: 'Artemis Kiwi', correo: 'artemis887@hotmail.com', tipoUsuario: 1, logIn: new Date(2022, 3, 3) }
    this.usuarios.push(usuario);
    usuario = { id: 'B2B2B2B2B2B2B2', nombre: 'Luis Lopez', correo: 'luislopez@hotmail.com', tipoUsuario: 1, logIn: new Date(2022, 1, 1) }
    this.usuarios.push(usuario);
    usuario = { id: 'c3c3c3c3c3c3c3', nombre: 'Martha Juarez', correo: 'marthajuarez@hotmail.com', tipoUsuario: 2, logIn: new Date(2022, 2, 2) }
    this.usuarios.push(usuario);
  }

  obtenerUsuarioActual(): Usuario | undefined {
    if (this.usuarios.length < 1 || !this.usuarioActivo) return undefined; // { id: 'a0a0a0a0a0', nombre: '', correo: '', tipoUsuario: 0, logIn: new Date() };
    if (!this.usuarioActivo) {
      this.usuarioActivo = this.usuarios[0].id;
      return this.usuarios[0];
    }
    let index = this.usuarios.findIndex(x => x.id == this.usuarioActivo);
    if (index < 0) return undefined; // { id: 'a0a0a0a0a0', nombre: '', correo: '', tipoUsuario: 0, logIn: new Date() };
    return this.usuarios[index];
  }

  seleccionarUsuarioActual(usuarioActual: string): Usuario | undefined {
    if (this.usuarios.length < 1 || !usuarioActual) {
      this.usuarioActivo = undefined;
      return undefined;
    }
    let index = this.usuarios.findIndex(x => x.id == usuarioActual);
    if (index < 0) return undefined;
    this.usuarioActivo = usuarioActual;
    return this.usuarios[index];
  }

  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }

  obtenerUsuariosObservable(): Observable<Usuario[]> {
    return this.usuarios$;
  }

  obtenerUsuariosBehaviorSubject(): Observable<Usuario[]> {
    return this.usuarios$$.asObservable();
  }

  // ========================================================================= HTTP

  obtenerUsuariosHttp(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.api}${this.urlPrefijo}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    )
  }

  obtenerUsuarioHttp(id: string | undefined): Observable<Usuario> {
    let url = `${environment.api}${this.urlPrefijo}/${id}`;
    return this.http.get<Usuario>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    );
  }

  agregarUsuarioHttp(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.api}${this.urlPrefijo}/`, usuario, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    );
  }

  modificarUsuarioHttp(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.api}${this.urlPrefijo}/${usuario.id}`, usuario).pipe(
      catchError(this.manejarError)
    );
  }

  eliminarUsuarioHttp(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${environment.api}${this.urlPrefijo}/${id}`).pipe(
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
