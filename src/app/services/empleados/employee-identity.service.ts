import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmpleadosListado } from 'src/app/models/empleadoListado';

export class EmployeeIdentityApi {

  constructor(private _httpClient: HttpClient) {
    this.crearEmpleados();
    this.empleadoBehaviorSubject = new BehaviorSubject<IEmpleadosListado[]>(this.empleados);
  }

  private empleados: IEmpleadosListado[] = [];
  private empleadoBehaviorSubject: BehaviorSubject<IEmpleadosListado[]>;

  public list(owner: string, company: number, campos: string[]): Observable<IEmpleadosListado[]> {
    return this.empleadoBehaviorSubject.asObservable();
  }

  private crearEmpleados() {
    this.empleados = [];
    for (let index = 0; index < 10; index++) {
      let empleado: IEmpleadosListado = {
        id: index + 1, nombre: '', codigo: '', rfc: '', curp: '', imss: '', correo: '', sueldo: 0, sdi: 0, altaTxt: '', alta: new Date(), bajaTxt: '', baja: new Date(),
        idDepartamento: 0, departamento: '', idHorario: '', horario: '', datosValidosCFDI40: '', valorValidosCFDI40: 0
      };
      switch (index) {
        case 0:
          empleado.nombre = "JOSE PEREZ";
          break;
        case 1:
          empleado.nombre = "RAUL LOPEZ";
          break;
        case 2:
          empleado.nombre = "JUANA DE ARCO";
          break;
      }
      this.empleados.push(empleado);
    }


  }

}
