import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public codigoPostal = new FormControl('', [Validators.required, Validators.maxLength(5)]);
  public enEdicion: boolean = false;

  constructor() { }

  public getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingresa un valor';
    }

    return this.email.hasError('email') ? 'Correo no valido' : '';
  }

  public errorCodigo() {
    if (this.codigoPostal.hasError('required')) {
      return 'Ingresa un valor';
    }

    return this.codigoPostal.hasError('maxLenght')
      ? 'Codigo Postal no valido'
      : '';
  }

  public abrirUnidadNE() {

  }

  ngOnInit(): void { }
}
