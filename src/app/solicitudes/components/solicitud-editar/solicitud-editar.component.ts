import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CVFechaT } from 'src/app/core/funciones/fFecha';
import { Sesión } from 'src/app/models/sesión';
import { SolicitudInfo } from 'src/app/models/solicitudInfo';
import { TipoUsuario } from 'src/app/models/usuario';
import { SesiónService } from 'src/app/services/sesión.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud-editar',
  templateUrl: './solicitud-editar.component.html',
  styleUrls: ['./solicitud-editar.component.scss']
})
export class SolicitudEditarComponent implements OnInit, OnDestroy {
  public esAdmin: boolean = false;
  public sesionSubscription!: Subscription;
  public sesion$: Observable<Sesión>;
  public sesion: Sesión = { activa: false, usuario: undefined };
  public idSolicitud: number = 0;
  public solicitud: SolicitudInfo | undefined;
  public solicitudSubscribe!: Subscription;
  public nuevaSolicitud: boolean = false;
  public error: Error | undefined;

  public formularioReactivo: FormGroup;

  public editando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudesService,
    private sesionServicio: SesiónService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formularioReactivo = this.formBuilder.group({
      id: new FormControl(''),
      asignadoA: new FormControl(''),
      cliente: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z ]*')]),
      correo: new FormControl(''),
      aplicacion: new FormControl(''),
      version: new FormControl(''),
      tipoMovimiento: new FormControl(''),
    });

    this.sesion$ = this.sesionServicio.obtenerSesión().pipe(
      map((sesion: Sesión) => this.sesion = sesion)
    );
  }

  private cargarSolicitud() {
    this.formularioReactivo.patchValue({
      id: this.solicitud?.id,
      asignadoA: this.solicitud?.usuarioAsignado,
      cliente: this.solicitud?.cliente,
      correo: this.solicitud?.correoCliente,
      aplicacion: this.solicitud?.appNombre,
      version: this.solicitud?.version,
      tipoMovimiento: this.solicitud?.tipoMovimiento
    });
    this.editando = false;
  }

  submitForm(): void {
    this.error = undefined;
    if (!this.formularioReactivo) return;
    if (!this.solicitud)
      this.solicitud = {
        id: 0, cliente: '', appId: '', version: 1, ace_ClientId: 0, fechaRegistro: new Date(), fechaRegistroTxt: '',
        tipoMovimiento: 'DE', solicitud: '', numHDD: '', plataforma: '', dato1: '', dato2: '', datoFecha: new Date(), datoFechaTxt: '',
        observaciones: '', pagoTipo: '', pagoFolio: '', pagoFecha: new Date(), pagoFechaTxt: '', pagoImporte: 0, asignadoA: '', pagoCfdiAdd: 0,
        appNombre: '', correoCliente: '', usuarioAsignado: '', numHDDSrv: '', mensajes: []
      };
    this.solicitud.id = this.formularioReactivo.get('id')?.value;
    this.solicitud.cliente = this.formularioReactivo.get('cliente')?.value;
    this.solicitud.usuarioAsignado = this.formularioReactivo.get('asignadoA')?.value;
    this.solicitud.correoCliente = this.formularioReactivo.get('correo')?.value;
    this.solicitud.appNombre = this.formularioReactivo.get('aplicacion')?.value;
    this.solicitud.version = this.formularioReactivo.get('version')?.value;
    this.solicitud.tipoMovimiento = this.formularioReactivo.get('tipoMovimiento')?.value;

    if (this.solicitud.id == 0) {
      this.solicitudSubscribe = this.solicitudService.agregarSolicitud(this.solicitud).subscribe(
        (resultado: SolicitudInfo) => {
          this.solicitud = resultado;
          this.router.navigate(['solicitudes/solicitudes']);
        }, (err: Error) => {          
          this.error = err;
          setTimeout(() => {
            this.error = undefined;
          }, 15000);
        }, () => {
          this.solicitudSubscribe.unsubscribe;
        }
      );
      return;
    }

    if (!this.esAdmin) {
      alert('Procedimiento solo para administradores');
      return;
    }

    this.solicitudSubscribe = this.solicitudService.modificarSolicitud(this.solicitud).subscribe(
      (resultado: SolicitudInfo) => {
        this.solicitud = resultado;
        this.router.navigate(['solicitudes/solicitudes']);
      }, (err: Error) => {
        this.error = err;
        setTimeout(() => {
          this.error = undefined;
        }, 15000);
      }, () => {
        this.solicitudSubscribe.unsubscribe;
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

  agregarSolicitud() {
    this.nuevaSolicitud = true;
    this.formularioReactivo.reset();
    this.solicitud = {
      id: 0, cliente: '', appId: '', version: 1, ace_ClientId: 0, fechaRegistro: new Date(), fechaRegistroTxt: '',
      tipoMovimiento: 'DE', solicitud: '', numHDD: '', plataforma: '', dato1: '', dato2: '', datoFecha: new Date(), datoFechaTxt: '',
      observaciones: '', pagoTipo: '', pagoFolio: '', pagoFecha: new Date(), pagoFechaTxt: '', pagoImporte: 0, asignadoA: '', pagoCfdiAdd: 0,
      appNombre: '', correoCliente: '', usuarioAsignado: '', numHDDSrv: '', mensajes: []
    };
    this.formularioReactivo.patchValue({
      id: 0,
      asignadoA: '',
      cliente: '',
      correo: '',
      aplicacion: '',
      version: 1.0,
      tipoMovimiento: 'DE'
    });
    this.editando = true;
  }

  cargarDatosOriginales() {
    this.formularioReactivo.reset();

    if (!this.idSolicitud || this.idSolicitud == 0) {
      this.agregarSolicitud();
      return;
    }

    this.solicitudSubscribe = this.solicitudService.obtenerSolicitud(this.idSolicitud).subscribe(
      (resultado: SolicitudInfo) => {
        this.solicitud = resultado;
        this.solicitud.fechaRegistro = CVFechaT(this.solicitud.fechaRegistroTxt);
        this.solicitud.datoFecha = CVFechaT(this.solicitud.datoFechaTxt);
        this.solicitud.pagoFecha = CVFechaT(this.solicitud.pagoFechaTxt);
        this.cargarSolicitud();
        this.editando = this.solicitud.id == 0;
      }, (err: Error) => {
        this.error = err;
        setTimeout(() => {
          this.error = undefined;
        }, 15000);
      }, () => {
        this.solicitudSubscribe.unsubscribe;
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
    this.idSolicitud = Number(routeParams.get('id'));

    this.cargarDatosOriginales();
    this.nuevaSolicitud = false;
  }

  ngOnDestroy(): void {
    if (this.solicitudSubscribe) this.solicitudSubscribe.unsubscribe();
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe();
  }

}
