import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeIdentityApi } from './employee-identity.service';

export class EmployeeApi {

  constructor(private _httpClient: HttpClient) { }

  public Identity = new EmployeeIdentityApi(this._httpClient);
}
