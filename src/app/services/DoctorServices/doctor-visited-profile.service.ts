import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { GeneralResponse } from '../../models/Story/general-response';

@Injectable({
  providedIn: 'root'
})

export class DoctorVisitedProfileService {
  constructor(private http: HttpClient) { }

  getDoctorById(doctorId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/doctorId?doctorId=${doctorId}`);
  }
  addRating(ratingData: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/Rating`, ratingData);
  }
  getRatingsForDoctor(doctorId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Rating/DoctorRatings/${doctorId}`);
  }

  checkAuthorizationToAddRating(doctorId: number): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(`${environment.baseUrl}/Rating/AuthorizedToRate?doctorId=${doctorId}`);
  }
}
