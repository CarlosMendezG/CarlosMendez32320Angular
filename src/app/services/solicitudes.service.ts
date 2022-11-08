import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SolicitudInfo } from '../models/solicitudInfo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private urlPrefijo: string = "/Solicitudes";

  constructor(
    private http: HttpClient
  ) { }

  obtenerSolicitudes(): Observable<SolicitudInfo[]> {
    return this.http.get<SolicitudInfo[]>(`${environment.api}${this.urlPrefijo}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    )
  }

  obtenerSolicitud(id: number): Observable<SolicitudInfo> {
    let url = `${environment.api}${this.urlPrefijo}/${id}`;
    return this.http.get<SolicitudInfo>(url, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    );
  }

  agregarSolicitud(cliente: SolicitudInfo): Observable<SolicitudInfo> {
    return this.http.post<SolicitudInfo>(`${environment.api}${this.urlPrefijo}/`, cliente, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    );
  }

  modificarSolicitud(cliente: SolicitudInfo): Observable<SolicitudInfo> {
    return this.http.put<SolicitudInfo>(`${environment.api}${this.urlPrefijo}/${cliente.id}`, cliente).pipe(
      catchError(this.manejarError)
    );
  }

  eliminarSolicitud(id: number): Observable<SolicitudInfo> {
    return this.http.delete<SolicitudInfo>(`${environment.api}${this.urlPrefijo}/${id}`).pipe(
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
