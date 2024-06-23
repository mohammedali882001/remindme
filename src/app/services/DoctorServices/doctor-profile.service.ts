import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DoctorGetDTO } from '../../models/Doctor/doctor-get-dto';
import { AvailableSlotsDTO } from '../../models/Doctor/available-slots-dto';
import { DoctorEditDTO } from '../../models/Doctor/doctor-edit-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

  private profileUrl = `${environment.baseUrl}/Doctor`; // Adjust URL as needed
  private availableSlotsUrl = `${environment.baseUrl}/Appointment/available-slots`; // Endpoint for available slots

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }

  getAvailableSlots(): Observable<AvailableSlotsDTO[]> {
    return this.http.get<AvailableSlotsDTO[]>(this.availableSlotsUrl);
  }


  // getAvailableSlots(): Observable<AvailableSlotsDTO[]> {
  //   return this.http.get<AvailableSlotsDTO[]>(this.slotsUrl);
  // }
  updateDoctorProfile(doctor: DoctorEditDTO): Observable<any> {
    return this.http.put<any>(this.profileUrl, doctor);
  }
}
