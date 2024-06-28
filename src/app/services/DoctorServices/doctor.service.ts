import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { GeneralResponse } from '../../models/Story/general-response';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  // getDoctors(): Observable<FilterDoctorDTO[]> {
  //   return this.http.get<{ isSuccess: boolean, data: FilterDoctorDTO[] }>(`${environment.baseUrl}/Doctor/Doctors`)
  //     .pipe(
  //       map(response => response.data)  // Map to the data array
  //     );
  // }
  // searchDoctorsByName(name: string): Observable<GeneralResponse> {
  //   return this.http.get<GeneralResponse>(`${environment.baseUrl}/Doctor/Doctor/${name}`);
  // }
  getDoctors(): Observable<FilterDoctorDTO[]> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/Doctors`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }

  searchDoctorsByName(name: string): Observable<FilterDoctorDTO[]> {
    return this.http.get<any>(`${environment.baseUrl}/Doctor/Doctor/${name}`)
      .pipe(
        map(response => {
          if (Array.isArray(response)) {
            return response as FilterDoctorDTO[]; // Directly return the array if no wrapper object
          } else if (response.isSuccess) {
            return response.data as FilterDoctorDTO[]; // Extract data array if wrapped
          } else {
            throw new Error('Unexpected API response format');
          }
        }),
        catchError(error => {
          console.error('Error searching doctors:', error);
          return throwError(error); // Rethrow the error
        })
      );
  }
}

