import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpleadosListado } from 'src/app/models/empleadoListado';
import { DistribuidoresService } from 'src/app/services/distribuidores.service';

@Component({
  selector: 'app-distribuidores-inicio',
  templateUrl: './distribuidores-inicio.component.html',
  styleUrls: ['./distribuidores-inicio.component.scss']
})
export class DistribuidoresInicioComponent implements OnInit {

  private ownerId: string = "";
  private companyId: number = 0;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _api: DistribuidoresService,
  ) {

  }

  public empleados: IEmpleadosListado[] = [{
    id: 0, nombre: '', codigo: '', rfc: '', curp: '', imss: '', correo: '', sueldo: 0, sdi: 0, altaTxt: '', alta: new Date(), bajaTxt: '', baja: new Date(),
    idDepartamento: 0, departamento: '', idHorario: '', horario: '', datosValidosCFDI40: '', valorValidosCFDI40: 0
  }];
  public tieneDepartamentos: boolean = false;
  public terminoCarga: boolean = false;
  public camposAdd: string[] = ['departamento', 'horario'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public columnas: string[] = ['id', 'nombre', 'rfc', 'curp', 'imss', 'correo', 'sueldo', 'sdi', 'alta', 'baja'];
  public dataSource: MatTableDataSource<IEmpleadosListado> = new MatTableDataSource<IEmpleadosListado>(this.empleados);
  public clickedRows: Set<IEmpleadosListado> = new Set<IEmpleadosListado>();

  public aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value.toLowerCase();

  }

  public openEmployee(employee: IEmpleadosListado, router: Router, route: ActivatedRoute): void {
    if (!route.parent) {
      throw new Error('An error has ocurred!');
    }

    const owner = route.parent.snapshot.params.owner;
    const company = route.parent.snapshot.params.company;
    const department = route.parent.snapshot.params['department'];

    if (department) {
      router.navigate([owner, 'companies', company, 'departments', department, 'employee', employee.id, 'data']);
      return;
    }

    router.navigate([owner, 'companies', company, 'employee', employee.id, 'data']);
  }

  public validarDatosCfdi40() {

  }

  public agregarEmpleado() {

  }

  ngOnInit(): void {
    this.terminoCarga = true;
    var parent = this._activatedRoute.parent;
    if (!parent) {
      throw new Error('An error has ocurred!');
    }

    this.ownerId = parent.snapshot.params['owner'];
    this.companyId = parent.snapshot.params['company'];

    // this._homeService.activeSection = 'employee';

    this._api.employee.Identity.list(this.ownerId, this.companyId, this.camposAdd).subscribe(
      (resultado: IEmpleadosListado[]) => {
        this.empleados = <IEmpleadosListado[]>resultado;
        this.dataSource = new MatTableDataSource<IEmpleadosListado>(this.empleados);
        console.log(this.empleados);
        this.terminoCarga = true;
      }, (err: Error) => {
        console.error(err);
        this.terminoCarga = true;
      }, () => {
        this.terminoCarga = true;
      }
    );

    this.clickedRows = new Set<IEmpleadosListado>();
  }

}
