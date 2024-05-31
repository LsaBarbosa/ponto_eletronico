import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
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

  public update(name: string, password: string, role: string): Observable<any> {
    const token = sessionStorage.getItem("token");
    const params = new HttpParams().set('name', name);
    const body = { password, role };

    return this.http.put<any>(`${this.apiServeUrl}/usuarios`, body, { params ,headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}}).pipe()
  }


  public deleteEmployee(employeeName: string): Observable<void> {
    const token = sessionStorage.getItem("token");
    return this.http.delete<void>(
      `${this.apiServeUrl}/usuarios?name=${employeeName}`, {headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}}).pipe(
    );
  }
}
