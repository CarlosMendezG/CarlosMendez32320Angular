import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { CVFechaT } from 'src/app/core/funciones/fFecha';
import { Sesion } from 'src/app/models/sesion';
import { Usuario, TipoUsuario } from 'src/app/models/usuario';
import { SesionService } from 'src/app/services/sesion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public esAdmin: boolean = false;
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesion>;
  public sesion: Sesion = { activa: false, usuario: undefined };
  public usuarios: Usuario[] = [];

  public usuarios$!: Observable<Usuario[]>;
  public usuariosSubscribe!: Subscription;
  public filtro: string = '';
  public filtroCampo: string = '';
  public orderBy: string = 'nombre';
  public orderByDesc: boolean = false;
  public error: Error | undefined;
  public esCurso: boolean = false;
  public esListado: boolean = false;
  public soloMostrarSinAsignar: boolean = false;
  public aplicarFiltroTimeout: any | undefined = undefined;
  public cargado: boolean = false;
  public tipoUsuario = TipoUsuario;
  public filtrarPor = $filtrarPor;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public columnas: string[] = [
    'id',
    'nombre',
    'correo',
    'logIn',
    'tipoUsuario'
  ];
  public dataSource: MatTableDataSource<Usuario> =
    new MatTableDataSource<Usuario>(this.usuarios);
  public clickedRows: Set<Usuario> = new Set<Usuario>();

  constructor(
    private usuariosServicio: UsuariosService,
    private sesionServicio: SesionService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.sesion$ = this.sesionServicio.obtenerSesion().pipe(
      map((sesion: Sesion) => this.sesion = sesion)
    );
  }

  public cargarUsuarios() {
    this.cargado = false;
    this.usuarios$ = this.usuariosServicio.obtenerUsuariosHttp();
    this.aplicarFiltros();
  }

  public aplicarFiltro(event: Event) {
    let filtro: string = (event.target as HTMLInputElement).value;
    if (this.filtro == filtro) return;
    this.filtro = filtro;
    this.cargado = false;
    if (this.aplicarFiltroTimeout) clearTimeout(this.aplicarFiltroTimeout);
    this.aplicarFiltroTimeout = setTimeout(() => {
      this.aplicarFiltros();
      this.aplicarFiltroTimeout = undefined;
    }, 700);
  }

  public aplicarFiltros() {
    this.cargado = false;
    this.usuarios$.subscribe((usuarios: Usuario[]) => {
      if (this.aplicarFiltroTimeout) clearTimeout(this.aplicarFiltroTimeout);
      this.usuarios = usuarios.filter((usuario: Usuario) => {
        usuario.logInDate = CVFechaT(usuario.logIn);
        return this.filtrarUsuarios(usuario);
      }).sort((a, b) => this.sortUsuarios(a, b));

      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cargado = true;
    });
  }

  private filtrarUsuarios(usuario: Usuario): boolean {
    if (!this.sesion.activa || !this.sesion.usuario) return false;
    if (this.sesion.usuario.tipoUsuario != TipoUsuario.administrador && this.sesion.usuario.tipoUsuario != TipoUsuario.top) return false;
    if (!this.filtro) return true;
    let filtro: string = this.filtro.toLowerCase();
    switch (this.filtroCampo.toLowerCase()) {
      case 'nombre':
        return usuario.nombre.toLowerCase().includes(filtro);
      case 'correo':
        return usuario.correo.toLowerCase().includes(filtro);
      case 'logIn':
        return usuario.logInDate.toLocaleDateString().toLowerCase().includes(filtro)
          || usuario.logInDate.toString().toLowerCase().toLocaleLowerCase().includes(filtro);
      case 'tipousuario':
        if (!this.tipoUsuario[usuario.tipoUsuario]) return false;
        return this.tipoUsuario[usuario.tipoUsuario].toLowerCase().includes(filtro);
      default:
        if (!this.tipoUsuario[usuario.tipoUsuario]) {
          return usuario.nombre.toLowerCase().includes(filtro)
            || usuario.correo.toLowerCase().includes(filtro)
            || usuario.logInDate.toLocaleDateString().toLowerCase().includes(filtro)
            || usuario.logInDate.toString().toLowerCase().toLocaleLowerCase().includes(filtro)
        }

        return usuario.nombre.toLowerCase().includes(filtro)
          || usuario.correo.toLowerCase().includes(filtro)
          || usuario.logInDate.toLocaleDateString().toLowerCase().includes(filtro)
          || usuario.logInDate.toString().toLowerCase().toLocaleLowerCase().includes(filtro)
          || this.tipoUsuario[usuario.tipoUsuario].toLowerCase().includes(filtro);
    }
  }

  private sortUsuarios(usuario1: Usuario, usuario2: Usuario): number {
    switch (this.orderBy) {
      case 'nombre':
        if (usuario1.nombre != usuario2.nombre) {
          if (this.orderByDesc) {
            return usuario2.nombre.localeCompare(usuario1.nombre);
          } else {
            return usuario1.nombre.localeCompare(usuario2.nombre);
          }
        }
        break;
      case 'correo':
        if (usuario1.correo != usuario2.correo) {
          if (this.orderByDesc) {
            return usuario2.correo.localeCompare(usuario1.correo);
          } else {
            return usuario1.correo.localeCompare(usuario2.correo);
          }
        }
        break;
      case 'tipoUsuario':
        if (usuario1.tipoUsuario != usuario2.tipoUsuario) {
          if (!this.tipoUsuario[usuario2.tipoUsuario]) return -1;
          if (this.tipoUsuario[usuario2.tipoUsuario]) return 0;
          if (this.orderByDesc) {
            return this.tipoUsuario[usuario2.tipoUsuario].localeCompare(this.tipoUsuario[usuario1.tipoUsuario]);
          } else {
            return this.tipoUsuario[usuario1.tipoUsuario].localeCompare(this.tipoUsuario[usuario1.tipoUsuario]);
          }
        }
        break;
      default:
        break;
    }
    if (this.orderByDesc) {
      return usuario1.logInDate.getTime() > usuario2.logInDate.getTime() ? -1 : 0;
    } else {
      return usuario2.logInDate.getTime() > usuario1.logInDate.getTime() ? -1 : 0;
    }
  }

  public seleccionarUsuario(idUsuario: string) {
    if (this.esCurso) {
      this.router.navigate([`usuarios/editar/${idUsuario}`]);
      return;
    }
    this.router.navigate(['usuarios/usuario']);
  }

  public editarUsuario(idUsuario: string) {
    this.router.navigate([`usuarios/editar/${idUsuario}`]);
  }

  public nuevoUsuario() {
    this.router.navigate([`usuarios/editar`]);
  }

  public eliminarUsuario(usuarioAEliminar: string) {
    let indexUsuario: number = this.usuarios.findIndex(
      (x) => x.id == usuarioAEliminar
    );
    if (indexUsuario < 0) {
      this.dialog.open(ErrorComponent, {
        data: 'No se puede localizar al usuario seleccionado',
        width: '350px',
      });
      return;
    }
    if (this.usuarios[indexUsuario].tipoUsuario == this.tipoUsuario.administrador || this.usuarios[indexUsuario].tipoUsuario == this.tipoUsuario.top) {
      this.dialog.open(ErrorComponent, {
        data: "No puede eliminar un usuario administrador",
        width: '350px',
      });
      return;
    }
    let nombreActual: { cliente: string } = { cliente: this.usuarios[indexUsuario].nombre };
    const dialogRef = this.dialog.open(DialogComponent, {
      data: nombreActual,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result}`);
      if (nombreActual.cliente != result) return;
      this.cargado = true;
      this.usuariosSubscribe = this.usuariosServicio.eliminarUsuarioHttp(usuarioAEliminar).subscribe(
        (resultado: Usuario) => {
          this.cargarUsuarios();
        }, (err: Error) => {
          console.error(err);
          this.error = err;
          setTimeout(() => {
            this.error = undefined;
          }, 15000);
        }, () => {
          this.usuariosSubscribe.unsubscribe;
        }
      );
    });
  }

  ngOnInit(): void {
    this.esAdmin = false;
    this.sesionSubscription = this.sesionServicio.obtenerSesion().subscribe(
      (sesion: Sesion) => {
        console.log('Sesión cargada');
        this.sesion = sesion;
        this.esAdmin = this.sesion && this.sesion.activa && (this.sesion.usuario?.tipoUsuario == TipoUsuario.top || this.sesion.usuario?.tipoUsuario == TipoUsuario.administrador);
      }, (err: Error) => {
        console.error(err);
        this.router.navigate([`inicio`]);
      }, () => {
        this.sesionSubscription.unsubscribe;
      }
    );

    this.cargado = false;
    this.clickedRows = new Set<Usuario>();
    this.esCurso = environment.curso;
    this.cargarUsuarios();
  }

  ngOnDestroy() {
    if (this.usuariosSubscribe) this.usuariosSubscribe.unsubscribe();
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe();
  }
}

const $filtrarPor: { [key: string]: string } = {
  "id": "Id",
  "nombre": "Usuario",
  "correo": "Correo",
  "logIn": "Último ingreso",
  "tipoUsuario": "Tipo de usuario",
  "": ""
}