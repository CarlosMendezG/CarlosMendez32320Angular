import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService
  ) {
    this.formularioReactivo = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z ]*')]),
      rfc: new FormControl('', [Validators.required, Validators.minLength(13), Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)])
    });
  }

  public cliente: Cliente | undefined = this.clientesService.obtenerClienteActual();

  public formularioReactivo: FormGroup;

  public editando: boolean = false;

  submitForm(): void {
    console.log(this.formularioReactivo.value);
    if (!this.formularioReactivo) return;
    if (!this.cliente) this.cliente = { id: 0, cliente: '', correo: '', rfc: '', regimenFiscal: '', cp: '', responsable: '', comentarios: '', idNEWeb: '' };
    this.cliente.cliente = this.formularioReactivo.get('nombre')?.value;
    this.cliente.rfc = this.formularioReactivo.get('rfc')?.value;

    if (this.cliente.id == 0) {
      this.cliente = this.clientesService.agregarCliente(this.cliente);
      this.formularioReactivo.patchValue({
        id: this.cliente?.id,
        nombre: this.cliente?.cliente,
        rfc: this.cliente?.rfc
      });
      this.editando = false;
      return;
    }
    // let index = this.clientes.findIndex(x => x.id == cliente.id);
    // cliente.imagen = `../../../assets/imagenes/cliente${cliente.id.toString().padStart(2, "0")}.jpg`;;
    this.clientesService.modificarCliente(this.cliente);
    this.editando = false;
  }

  getFechaT(fecha: string): Date {
    let año: number = parseInt(fecha.substring(0, 4));
    let mes: number = parseInt(fecha.substring(5, 7));
    let dia: number = parseInt(fecha.substring(8, 10));
    if (fecha.length < 12) return new Date(año, mes - 1, dia);

    let hora: number = parseInt(fecha.substring(11, 13));
    let minutos: number = parseInt(fecha.substring(14, 16));
    let segundos: number = parseInt(fecha.substring(17, 18));
    return new Date(año, mes - 1, dia, hora, minutos, segundos);
  }

  getFechaTu(fecha: string | undefined): Date | undefined {
    if (!fecha) return undefined;
    let año: number = parseInt(fecha.substring(0, 4));
    let mes: number = parseInt(fecha.substring(5, 7));
    let dia: number = parseInt(fecha.substring(8, 10));
    if (fecha.length < 12) return new Date(año, mes - 1, dia);

    let hora: number = parseInt(fecha.substring(11, 13));
    let minutos: number = parseInt(fecha.substring(14, 16));
    let segundos: number = parseInt(fecha.substring(17, 18));
    return new Date(año, mes - 1, dia, hora, minutos, segundos);
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

  agregarEmpleado() {
    this.formularioReactivo.reset();
    this.cliente = { id: 0, cliente: '', correo: '', rfc: '', regimenFiscal: '', cp: '', responsable: '', comentarios: '', idNEWeb: '' };
    this.formularioReactivo.patchValue({
      id: this.cliente.id,
      nombre: this.cliente.cliente,
      rfc: this.cliente.rfc
    });
    this.editando = true;
  }

  cargarDatosOriginales() {
    this.formularioReactivo.reset();
    this.cliente = this.clientesService.obtenerClienteActual();
    if (!this.cliente) {
      this.cliente = { id: 0, cliente: '', correo: '', rfc: '', regimenFiscal: '', cp: '', responsable: '', comentarios: '', idNEWeb: '' };
    }
    this.formularioReactivo.patchValue({
      id: this.cliente.id,
      nombre: this.cliente.cliente,
      rfc: this.cliente.rfc
    });
    this.editando = this.cliente.id == 0;
  }

  getDateT(fecha: Date | undefined): string | undefined {
    if (!fecha) return undefined;
    let fechaTxt: string = fecha.getFullYear().toString().padStart(4, "0") + "-" +
      (1 + fecha.getMonth()).toString().padStart(2, "0") + "-" +
      fecha.getDate().toString().padStart(2, "0") + "T" +
      fecha.getHours().toString().padStart(2, "0") + ":" +
      fecha.getMinutes().toString().padStart(2, "0") + ":" +
      fecha.getSeconds().toString().padStart(2, "0");
    return fechaTxt;
  }

  getDateText(fecha: Date | undefined): string | undefined {
    if (!fecha) return undefined;
    let fechaTxt: string = fecha.getFullYear().toString().padStart(4, "0") + "-" +
      (1 + fecha.getMonth()).toString().padStart(2, "0") + "-" +
      fecha.getDate().toString().padStart(2, "0");
    return fechaTxt;
  }

  ngOnInit(): void {
    this.cargarDatosOriginales();
  }

}
