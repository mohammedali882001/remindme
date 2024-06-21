import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DoctorGetDTO } from '../../models/Doctor/doctor-get-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorProfileService {

  private profileUrl = `${environment.baseUrl}/Doctor`; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.profileUrl);
  }
}
