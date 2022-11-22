import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Sesión } from '../models/sesión';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SesiónService {
  private sesiónSubject: BehaviorSubject<Sesión>;
  private usuarioSubscribe!: Subscription;

  constructor(
    private usuarioServicio: UsuariosService
  ) {
    const sesión: Sesión = {
      activa: false,
      usuario: undefined
    };
    this.sesiónSubject = new BehaviorSubject(sesión);
  }



  public logIn(usuarioId: string, contraseña: string) {
    let sesión: Sesión = {
      activa: false,
      usuario: undefined
    }

    this.usuarioSubscribe = this.usuarioServicio.obtenerUsuarioHttp(usuarioId).subscribe(
      (resultado: Usuario) => {
        sesión.activa = true;
        sesión.usuario = resultado;
        this.sesiónSubject.next(sesión);
      }, (err: Error) => {
        this.sesiónSubject.next(sesión);
      }, () => {
        this.usuarioSubscribe.unsubscribe;
      }
    );
  }

  public ponerSesión(sesión: Sesión): Observable<Sesión> {
    this.sesiónSubject.next(sesión);
    return this.sesiónSubject.asObservable();
  }

  public obtenerSesión(): Observable<Sesión> {
    return this.sesiónSubject.asObservable();
  }

}
