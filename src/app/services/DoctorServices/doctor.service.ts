import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<FilterDoctorDTO[]> {
    return this.http.get<{ isSuccess: boolean, data: FilterDoctorDTO[] }>(`${environment.baseUrl}/Doctor/Doctors`)
      .pipe(
        map(response => response.data)  // Map to the data array
      );
  }
}
