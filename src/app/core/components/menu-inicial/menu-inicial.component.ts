import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';
import { TipoUsuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit, OnDestroy {

  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesion>;
  public sesion: Sesion = { activa: false, usuario: undefined };
  public esAdmin: boolean = false;
  public esCurso: boolean = false;
  public ruta: string = "inicio";

  constructor(
    private sesionService: SesionService,
    private readonly _router: Router
  ) {
    this.sesion$ = this.sesionService.obtenerSesion().pipe(
      map((sesion: Sesion) => this.sesion = sesion)
    );

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
    let sesion: Sesion = {
      activa: false,
      usuario: undefined
    }
    this.sesionService.ponerSesion(sesion);
    if (this.ruta == "inicio") {
      this._router.navigate(['autenticacion/login']);
      return;
    }
    this._router.navigate(['inicio']);
  }


  ngOnInit(): void {
    this.esCurso = environment.curso;
    this.obtenerRuta(this._router.url);
    this.sesionSubscription = this.sesionService.obtenerSesion().subscribe(
      (sesion: Sesion) => {
        console.log('Sesión cargada');
        this.sesion = sesion;
        this.esAdmin = sesion.usuario?.tipoUsuario == TipoUsuario.administrador || sesion.usuario?.tipoUsuario == TipoUsuario.top;
      }, (err: Error) => {
        console.error(err);
      }, () => {
        this.sesionSubscription.unsubscribe;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe;
  }

}
