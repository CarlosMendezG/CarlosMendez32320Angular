import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CVFechaT } from 'src/app/core/funciones/fFecha';
import { newGuid } from 'src/app/core/funciones/fTexto';
import { Sesión } from 'src/app/models/sesión';
import { TipoUsuario, Usuario } from 'src/app/models/usuario';
import { SesiónService } from 'src/app/services/sesión.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.scss']
})
export class UsuariosEditarComponent implements OnInit, OnDestroy {
  public esAdmin: boolean = false;
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesión>;
  public sesion: Sesión = { activa: false, usuario: undefined };
  public idUsuario: string | undefined = undefined;
  public usuario: Usuario | undefined;
  public usuarioSubscribe!: Subscription;
  public nuevoUsuario: boolean = false;
  public error: Error | undefined;

  public formularioReactivo: FormGroup;

  public editando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private sesionServicio: SesiónService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formularioReactivo = this.formBuilder.group({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z ]*')]),
      correo: new FormControl(''),
      tipoUsuario: new FormControl('')
    });

    this.sesion$ = this.sesionServicio.obtenerSesión().pipe(
      map((sesion: Sesión) => this.sesion = sesion)
    );
  }

  private cargarUsuario() {
    this.formularioReactivo.patchValue({
      id: this.usuario?.id,
      nombre: this.usuario?.nombre,
      correo: this.usuario?.correo,
      tipoUsuario: this.usuario?.tipoUsuario
    });
    this.editando = false;
  }

  submitForm(): void {
    this.error = undefined;
    if (!this.formularioReactivo) return;
    if (!this.usuario) {
      this.usuario = { id: '', nombre: '', correo: '', tipoUsuario: TipoUsuario.usuario, logIn: '1900-01-01T00:00:00', logInDate: new Date(1900, 0, 1) };
    }
    this.usuario.id = this.formularioReactivo.get('id')?.value;
    this.usuario.nombre = this.formularioReactivo.get('nombre')?.value;
    this.usuario.correo = this.formularioReactivo.get('correo')?.value;
    this.usuario.tipoUsuario = this.formularioReactivo.get('tipoUsuario')?.value;

    if (!this.usuario.id || this.nuevoUsuario) {
      if (!this.usuario.id || this.usuario.id == '0') this.usuario.id = newGuid();
      this.usuarioSubscribe = this.usuariosService.agregarUsuarioHttp(this.usuario).subscribe(
        (resultado: Usuario) => {
          this.usuario = resultado;
          this.cargarUsuario();
        }, (err: Error) => {
          this.error = err;
          setTimeout(() => {
            this.error = undefined;
          }, 15000);
        }, () => {
          this.usuarioSubscribe.unsubscribe;
        }
      );
      return;
    }

    if (!this.esAdmin) {
      alert('Procedimiento solo para administradores');
      return;
    }

    this.usuarioSubscribe = this.usuariosService.modificarUsuarioHttp(this.usuario).subscribe(
      (resultado: Usuario) => {
        this.usuario = resultado;
        this.router.navigate(['usuarios/usuarios']);
      }, (err: Error) => {
        this.error = err;
        setTimeout(() => {
          this.error = undefined;
        }, 15000);
      }, () => {
        this.usuarioSubscribe.unsubscribe;
      }
    );
  }

  esValido(campo: string): boolean {
    if (!this.editando) return false;
    if (!this.formularioReactivo.get(campo)?.touched) return false;
    return this.formularioReactivo.get(campo)?.valid || false;
  }

  esRequerido(campo: string): boolean {
    if (!this.editando) return false;
    if (!this.formularioReactivo.get(campo)?.touched) return false;
    return this.formularioReactivo.get(campo)?.errors?.['required'] || false;
  }

  faltaLongitud(campo: string): boolean {
    if (!this.editando) return false;
    if (!this.formularioReactivo.get(campo)?.touched) return false;
    return this.formularioReactivo.get(campo)?.errors?.['minlength'] || false;
  }

  patronCorrecto(campo: string): boolean {
    if (!this.editando) return false;
    if (!this.formularioReactivo.get(campo)?.touched) return false;
    return this.formularioReactivo.get(campo)?.errors?.['pattern'] || false;
  }

  agregarUsuario() {
    this.nuevoUsuario = true;
    this.formularioReactivo.reset();
    this.usuario = { id: '', nombre: '', correo: '', tipoUsuario: TipoUsuario.usuario, logIn: '1900-01-01T00:00:00', logInDate: new Date(1900, 0, 1) };
    this.formularioReactivo.patchValue({
      id: 0,
      nombre: '',
      correo: '',
      tipoUsuario: TipoUsuario.usuario
    });
    this.editando = true;
  }

  cargarDatosOriginales() {
    this.formularioReactivo.reset();

    if (!this.idUsuario || this.idUsuario == '0') {
      this.agregarUsuario();
      return;
    }

    this.usuarioSubscribe = this.usuariosService.obtenerUsuarioHttp(this.idUsuario).subscribe(
      (resultado: Usuario) => {
        this.usuario = resultado;
        this.usuario.logInDate = CVFechaT(this.usuario.logIn);
        this.cargarUsuario();
        this.editando = !this.usuario.id;
      }, (err: Error) => {
        this.error = err;
        setTimeout(() => {
          this.error = undefined;
        }, 15000);
      }, () => {
        this.usuarioSubscribe.unsubscribe;
      }
    );
  }

  ngOnInit(): void {
    this.esAdmin = false;
    this.sesionSubscription = this.sesionServicio.obtenerSesión().subscribe(
      (sesion: Sesión) => {
        this.sesion = sesion;
        this.esAdmin = this.sesion && this.sesion.activa && (this.sesion.usuario?.tipoUsuario == TipoUsuario.top || this.sesion.usuario?.tipoUsuario == TipoUsuario.administrador);
      }, (err: Error) => {
        
      }, () => {
        this.sesionSubscription.unsubscribe;
      }
    );

    const routeParams = this.route.snapshot.paramMap;
    this.idUsuario = routeParams.get('id') || undefined;

    this.cargarDatosOriginales();
    this.nuevoUsuario = false;
  }

  ngOnDestroy(): void {
    if (this.usuarioSubscribe) this.usuarioSubscribe.unsubscribe();
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe();
  }

}
