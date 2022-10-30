import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sesion } from 'src/app/models/sesion';
import { TipoUsuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(
    private sesion: SesionService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sesion.obtenerSesion().pipe(
      map((sesion: Sesion) => {
        if (sesion.activa && sesion.usuario && (sesion.usuario.tipoUsuario == TipoUsuario.administrador || sesion.usuario.tipoUsuario == TipoUsuario.top)) {
          return true;
        } else if (sesion.activa && sesion.usuario && sesion.usuario.tipoUsuario != TipoUsuario.administrador && sesion.usuario.tipoUsuario != TipoUsuario.top) {
          this.router.navigate(['noAutorizado']);
          return false;
        } else {
          console.log(`Redirigiendo Admin a: inicio desde ${this.router.url}`);
          this.router.navigate(['inicio']);
          return false;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
