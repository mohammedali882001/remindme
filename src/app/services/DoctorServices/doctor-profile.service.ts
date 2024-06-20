import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DoctorGetDTO } from '../../models/Doctor/doctor-get-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

  private apiUrl = `${environment.baseUrl}/Doctor`;
  constructor(private http: HttpClient) {}

  getDoctorProfile(): Observable<DoctorGetDTO> {
    return this.http.get<DoctorGetDTO>(this.apiUrl);
  }
}
