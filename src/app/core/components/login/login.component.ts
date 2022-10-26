import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuarios } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
export class LoginComponent implements OnInit {

  constructor(
    private usuarioServicio: UsuariosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios
  ) {
    this.formularioReactivo = this.formBuilder.group({ selected: this.selected });
  }

  public selected: FormControl = new FormControl('valid', [Validators.required]); // , Validators.pattern('valid')
  public formularioReactivo = this.formBuilder.group({ selected: this.selected });
  matcher = new MyErrorStateMatcher();

  public usuarios: Usuarios[] = this.usuarioServicio.obtenerUsuarios();

  seleccionarUsuario() {
    this.dialogRef.close(this.selected.value);
  }

  cerrarForm() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formularioReactivo.reset();

  }

}
