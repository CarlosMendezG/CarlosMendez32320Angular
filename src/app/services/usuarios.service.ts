import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuarios } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Usuarios[] = [];
  private usuarioActivo: string | undefined = undefined;
  private usuarios$: Observable<Usuarios[]>;  // $ => Observable  
  private usuarios$$: BehaviorSubject<Usuarios[]>;

  constructor() {
    this.crearUsuarios();
    this.usuarios$ = new Observable<Usuarios[]>((suscriptor) => {
      suscriptor.next(this.usuarios);
    })
    this.usuarios$$ = new BehaviorSubject<Usuarios[]>(this.usuarios);
  }

  private crearUsuarios() {
    let usuario: Usuarios = { id: 'a1a1a1a1a1', nombre: 'Juan Perez', correo: 'juan.perez@hotmail.com', tipoUsuario: 0, logIn: new Date(2020, 1, 1) }
    this.usuarios.push(usuario);
    usuario = { id: 'a2a2a2a2a2a2a2', nombre: 'Artemis Kiwi', correo: 'artemis887@hotmail.com', tipoUsuario: 1, logIn: new Date(2022, 3, 3) }
    this.usuarios.push(usuario);
    usuario = { id: 'B2B2B2B2B2B2B2', nombre: 'Luis Lopez', correo: 'luislopez@hotmail.com', tipoUsuario: 1, logIn: new Date(2022, 1, 1) }
    this.usuarios.push(usuario);
    usuario = { id: 'c3c3c3c3c3c3c3', nombre: 'Martha Juarez', correo: 'marthajuarez@hotmail.com', tipoUsuario: 2, logIn: new Date(2022, 2, 2) }
    this.usuarios.push(usuario);
  }

  obtenerUsuarioActual(): Usuarios | undefined {
    if (this.usuarios.length < 1 || !this.usuarioActivo) return undefined; // { id: 'a0a0a0a0a0', nombre: '', correo: '', tipoUsuario: 0, logIn: new Date() };
    if (!this.usuarioActivo) {
      this.usuarioActivo = this.usuarios[0].id;
      return this.usuarios[0];
    }
    let index = this.usuarios.findIndex(x => x.id == this.usuarioActivo);
    if (index < 0) return undefined; // { id: 'a0a0a0a0a0', nombre: '', correo: '', tipoUsuario: 0, logIn: new Date() };
    return this.usuarios[index];
  }

  seleccionarUsuarioActual(usuarioActual: string): Usuarios | undefined {
    if (this.usuarios.length < 1 || !usuarioActual) {
      this.usuarioActivo = undefined;
      return undefined;
    }
    let index = this.usuarios.findIndex(x => x.id == usuarioActual);
    if (index < 0) return undefined;
    this.usuarioActivo = usuarioActual;
    return this.usuarios[index];
  }

  obtenerUsuarios(): Usuarios[] {
    return this.usuarios;
  }

  obtenerUsuariosObservable(): Observable<Usuarios[]> {
    return this.usuarios$;
  }

  obtenerUsuariosBehaviorSubject(): Observable<Usuarios[]> {
    return this.usuarios$$.asObservable();
  }
}
