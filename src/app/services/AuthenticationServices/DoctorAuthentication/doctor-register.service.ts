import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorRegisterService {
  private apiUrl = `${environment.baseUrl}/Account/Register/Doctor`;

  constructor(private _httpClient:HttpClient){}
  registerDoctor(registerDto: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post(this.apiUrl, registerDto, { headers });
  }
  isUsernameTaken(userName: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const checkUsernameDto = { userName };
    return this._httpClient.post<any>(`${this.apiUrl}/Account/CheckUsername`, checkUsernameDto, { headers }).pipe(
      map(response => !response.isSuccess) // `true` if taken, `false` if available
    );
  }
}
