import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public codigoPostal = new FormControl('', [
    Validators.required,
    Validators.maxLength(5),
  ]);
  public enEdicion: boolean = false;
  public mostrarDatosRegistrados: boolean = false;
  public mostrarDatosSolicitud: boolean = false;

  constructor() {}

  public abrirUnidadNE() {}

  ngOnInit(): void {}
}
