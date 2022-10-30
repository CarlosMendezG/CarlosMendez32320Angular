import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Subscription } from 'rxjs';
import { SesionService } from 'src/app/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public usuariosSubscribe: Subscription;

  constructor(
    private usuarioServicio: UsuariosService,
    private sesionServicio: SesionService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.usuariosSubscribe = this.usuarioServicio.obtenerUsuariosHttp().subscribe(
      (resultado: Usuario[]) => {
        this.usuarios = resultado;
      }, (err: Error) => {
        this.usuarios = [];
      }, () => {
        this.usuariosSubscribe.unsubscribe;
      }
    );
  }

  public selected: FormControl = new FormControl('valid', [Validators.required]); // , Validators.pattern('valid')
  public contrasenna: FormControl = new FormControl('123', [Validators.required]);
  public formularioReactivo: FormGroup = this.formBuilder.group(
    { selected: this.selected },
    { contrasenna: this.contrasenna }
  );
  matcher = new MyErrorStateMatcher();

  public usuarios: Usuario[] = [];
  public error: string | undefined = "";

  public async seleccionarUsuario() {
    if (!this.contrasenna.value) {
      this.error = "Es necesario capturar la contraseña";
      setTimeout(() => {
        this.error = undefined;
      }, 15000);
      return;
    }

    let sesion: Sesion = {
      activa: false,
      usuario: undefined
    }

    this.usuariosSubscribe = this.usuarioServicio.obtenerUsuarioHttp(this.selected.value).subscribe(
      (resultado: Usuario) => {
        sesion.activa = true;
        sesion.usuario = resultado;
        this.sesionServicio.ponerSesion(sesion);
        this.dialogRef.close(this.selected.value);
      }, (err: Error) => {
        this.sesionServicio.ponerSesion(sesion);
      }, () => {
        this.usuariosSubscribe.unsubscribe;
      }
    );
  }

  public cerrarForm() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formularioReactivo.reset();

  }

  ngOnDestroy() {
    if (this.usuariosSubscribe) this.usuariosSubscribe.unsubscribe();
  }

}
