import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { $tipoUsuario, Usuarios } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private usuarioServicio: UsuariosService,
    private dialog: MatDialog
  ) {

  }

  public usuario: Usuarios | undefined = this.usuarioServicio.obtenerUsuarioActual();
  public tipoUsuario: string = "";
  public tiposUsuario = $tipoUsuario;

  ngOnInit(): void {
    const logIn = this.dialog.open(LoginComponent, {
      data: this.usuario,
      width: '350px'
    });

    logIn.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result}`);
      this.usuario = this.usuarioServicio.seleccionarUsuarioActual(result);
      this.tipoUsuario = this.usuario ? this.tiposUsuario[this.usuario.tipoUsuario] : '';
    });
  }

}
