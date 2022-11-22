import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Sesión } from 'src/app/models/sesión';
import { TipoUsuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { asignarSesiónActiva, cargarSesión } from '../../state/sesión.actions';
import { selectSesiónActiva } from '../../state/sesion.selectors';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit, OnDestroy {
  public sesion!: Sesión;
  public esAdmin: boolean = false;
  public esCurso: boolean = false;
  public ruta: string = "inicio";

  constructor(
    private storeSesión: Store<Sesión>,
    private readonly _router: Router
  ) {
    this.storeSesión.dispatch(cargarSesión());

    _router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      this.obtenerRuta(_router.url);
    });
  }

  private obtenerRuta(url: string) {
    if (!url) {
      this.ruta = "inicio";
      return;
    }
    let rutas: string[] = url.split('/');
    if (rutas.length < 2 || !rutas[1]) {
      this.ruta = "inicio";
      return;
    }
    this.ruta = rutas[1];
  }

  public cerrarSesion() {
    this.sesion.activa = false;
    this.sesion.usuario = undefined;
    this.esAdmin = false;
    this.storeSesión.dispatch(asignarSesiónActiva( { sesión: this.sesion }));    
  }


  ngOnInit(): void {
    this.esCurso = environment.curso;
    this.obtenerRuta(this._router.url);
    this.storeSesión.select(selectSesiónActiva).subscribe((sesión: Sesión) => {
      this.sesion = sesión;
      if (!sesión.activa || !sesión.usuario) {
        this.esAdmin = false;
        this._router.navigate(['autenticacion/login']);
        return;
      }
      this.esAdmin = this.sesion.usuario != undefined && (this.sesion.usuario.tipoUsuario == TipoUsuario.administrador || this.sesion.usuario.tipoUsuario == TipoUsuario.top);
      this._router.navigate(['inicio']);
    });
  }

  ngOnDestroy(): void {    
  }

}
