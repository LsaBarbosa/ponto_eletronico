import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServeUrl}/usuarios`);
  }

  public update(name: string, password: string, role: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    const body = { password, role };

    return this.http.put<any>(`${this.apiServeUrl}/usuarios`, body, { params }).pipe();
  }


  public deleteEmployee(employeeName: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServeUrl}/usuarios?name=${employeeName}`
    );
  }
}
