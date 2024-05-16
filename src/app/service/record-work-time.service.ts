import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import {RecordWorkTime} from "../model/RecordWorkTime";

@Injectable({
  providedIn: 'root'
})
export class RecordWorkTimeService {

  private apiServeUrl: string = environment.apiServiceUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public addCheckin(name: string): Observable<RecordWorkTime> {
    const params = new HttpParams().set('name', name);
    return this.http.post<RecordWorkTime>(`${this.apiServeUrl}/ponto/entrada`, null, {params});
  }

  public addCheckout(name: string): Observable<RecordWorkTime> {
    const params = new HttpParams().set('name', name);
    return this.http.post<RecordWorkTime>(`${this.apiServeUrl}/ponto/saida`, null, {params});
  }

  public calculateOvertimeByDateRange(name: string, startDate: string | null, endDate: string | null): Observable<{ totalOvertime: string }> {
    if (startDate && endDate) {
      const params = new HttpParams()
        .set('name', name)
        .set('dataInicial', startDate) // Alteração aqui
        .set('dataFinal', endDate); // Alteração aqui
      return this.http.get<{ totalOvertime: string }>(`${this.apiServeUrl}/ponto/horas-extras`, {params});
    } else {
      return throwError('startDate and endDate must be provided.');
    }
  }

  public searchRecordsByDateRange(name: string, startDate: string | null, endDate: string | null): Observable<RecordWorkTime[]> {
    if (startDate && endDate) {
      const params = new HttpParams()
        .set('name', name)
        .set('startDate', startDate)
        .set('endDate', endDate);
      return this.http.get<RecordWorkTime[]>(`${this.apiServeUrl}/ponto/registros`, {params});
    } else {
      return throwError('startDate and endDate must be provided.');
    }
  }
}
