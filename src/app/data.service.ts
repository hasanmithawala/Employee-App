import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public baseUrl = 'http://localhost:9002';

  constructor(public http: HttpClient) {}
  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees`);
  }
  getDepartments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments`);
  }

  getDesignationsByDepartmentName(departmentName: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/departments/${departmentName}/designations`
    );
  }

  getStates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/states`);
  }

  getCitiesByStateId(stateId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cities/${stateId}`);
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/add`, employeeData);
  }
}
