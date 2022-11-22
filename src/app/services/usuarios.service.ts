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
  private urlPrefijo: string = "/Usuarios";

  constructor(
    private http: HttpClient
  ) { }

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

  eliminarUsuarioHttp(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${environment.api}${this.urlPrefijo}/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
    } else {
      
    }

    return throwError(() => new Error('Error en la comunicación HTTP'));
  }
}
