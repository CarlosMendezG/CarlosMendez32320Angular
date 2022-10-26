import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeApi } from './empleados/empleados.service';

@Injectable({
  providedIn: 'root'
})
export class DistribuidoresService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public employee = new EmployeeApi(this._httpClient);
}
