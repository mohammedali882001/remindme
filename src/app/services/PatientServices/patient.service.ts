import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RelativeDTO } from '../../models/Patient/relative-dto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private profileUrl = `${environment.baseUrl}/Relative`; // Adjust URL as needed
  private updatePhotoUrl = `${environment.baseUrl}/Patient/UpdatePhoto`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }

  getAllReports(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Report/ReportsOfPatientByRelative`);
  }

  viewReport(reportId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Report/ViewReport/${reportId}`);
  }

  updatePatientProfile(relative: RelativeDTO): Observable<any> {
    return this.http.put<any>(this.profileUrl, relative);
  }

  getAppointmentsOfPatient(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Appointment/AfterAppointmentsOfTodayOfPatient`);
  }

  updatePhoto(formData: FormData): Observable<any> {
    return this.http.put<any>(this.updatePhotoUrl, formData);
  }
}


