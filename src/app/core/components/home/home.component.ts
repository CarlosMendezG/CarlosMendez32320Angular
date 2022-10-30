import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sesion } from 'src/app/models/sesion';
import { $tipoUsuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesion>;
  public sesion: Sesion = { activa: false, usuario: undefined };
  public tiposUsuario = $tipoUsuario;

  constructor(
    private sesionServicio: SesionService
  ) {
    this.sesion$ = this.sesionServicio.obtenerSesion().pipe(
      map((sesion: Sesion) => this.sesion = sesion)
    );
  }

  ngOnInit(): void {
    this.sesionSubscription = this.sesionServicio.obtenerSesion().subscribe(
      (sesion: Sesion) => {
        console.log('Sesión cargada');
        this.sesion = sesion;
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
