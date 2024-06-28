import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class DoctorVisitedProfileService {
  constructor(private http: HttpClient) { }

  getDoctorById(doctorId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/doctorId?doctorId=${doctorId}`);
  }
 
}
