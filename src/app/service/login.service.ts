import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServeUrl: string = environment.apiServiceUrl;

  constructor(private http: HttpClient) {
  }

  public login(name: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiServeUrl}/auth/login`, {name, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("token", value.token)
      })
    )
  }

  public signup(name: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiServeUrl}/auth/register`, {name, password, role}).pipe();
  }
}

export type LoginResponse = {
  token: string;
};
