import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Usuarios } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { aceSoporte_version } from '../../ace_datos';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private usuarioServicio: UsuariosService,
    private dialog: MatDialog,
    private readonly _router: Router
  ) {
    _router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      this.obtenerRuta(_router.url);
    });

  }

  public usuario: Usuarios | undefined = this.usuarioServicio.obtenerUsuarioActual();
  public ruta: string = "inicio";
  public aceSoporte_version = aceSoporte_version;

  public cerrarSesion() {
    const logIn = this.dialog.open(LoginComponent, {
      data: this.usuario,
      width: '350px'
    });

    logIn.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result}`);
      this.usuario = this.usuarioServicio.seleccionarUsuarioActual(result);
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

  ngOnInit(): void {
    this.obtenerRuta(this._router.url);
  }

}
