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

}


// updateProfile(profileData: any): Observable<any> {
  //   // Ensure profileData is not null or undefined
  //   if (!profileData) {
  //     throw new Error('Profile data is required for update.');
  //   }

  //   // Prepare the data to send
  //   const data = {
  //     RelativeFirstName: profileData?.RelativeFirstName || '',
  //     RelativeLastName: profileData?.RelativeLastName || '',
  //     RelativeUserName: profileData?.RelativeUserName || '',
  //     RelativePhoneNumber: profileData?.RelativePhoneNumber || '',
  //     RelativeAddress: profileData?.RelativeAddress || '',
  //     RelativeGender: profileData?.RelativeGender?.toString() || '',
  //     PatientName: profileData?.PatientName || '',
  //     PatientLastName: profileData?.PatientLastName || '',
  //     PatientAge: profileData?.PatientAge?.toString() || '',
  //     PatientAddress: profileData?.PatientAddress || '',
  //     PatientGender: profileData?.PatientGender?.toString() || '',
  //     //Image:profileData?.Image ||''
  //   };

  //   // Make the PUT request with data in the body
  //   return this.http.put<any>(this.profileUrl, data);
  // }
