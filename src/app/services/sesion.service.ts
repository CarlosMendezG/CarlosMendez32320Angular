import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Sesion } from '../models/sesion';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private sesionSubject: BehaviorSubject<Sesion>;
  private usuarioSubscribe!: Subscription;

  constructor(
    private usuarioServicio: UsuariosService
  ) {
    const sesion: Sesion = {
      activa: false,
      usuario: undefined
    };
    this.sesionSubject = new BehaviorSubject(sesion);
  }



  public logIn(usuarioId: string, contrasenna: string) {
    let sesion: Sesion = {
      activa: false,
      usuario: undefined
    }

    this.usuarioSubscribe = this.usuarioServicio.obtenerUsuarioHttp(usuarioId).subscribe(
      (resultado: Usuario) => {
        sesion.activa = true;
        sesion.usuario = resultado;
        this.sesionSubject.next(sesion);
      }, (err: Error) => {
        this.sesionSubject.next(sesion);
      }, () => {
        this.usuarioSubscribe.unsubscribe;
      }
    );
  }

  public ponerSesion(sesion: Sesion) {
    this.sesionSubject.next(sesion);
  }

  public obtenerSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }

}
