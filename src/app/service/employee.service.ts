import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/Employee";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServeUrl: string = environment.apiServiceUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServeUrl}/usuarios`);
  }

  public getEmployeeId(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServeUrl}/usuarios/${employeeId}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServeUrl}/usuarios`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiServeUrl}/usuarios/update`,
      employee
    );
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServeUrl}/usuarios/delete/${employeeId}`
    );
  }
}
