import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorDashBoardDto } from '../models/doctor-dash-board-dto';
import { DoctorDashboardService } from './DoctorServices/doctor-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private countSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Initialize with 0 or desired initial value

  constructor(private doctorDashboardService: DoctorDashboardService) {
    // Optionally, initialize count from statistics
    this.doctorDashboardService.getStatistics().subscribe({
      next: (res: { isSuccess: boolean; data: DoctorDashBoardDto }) => {
        if (res.isSuccess) {
          this.countSubject.next(res.data.numberOfPatients);
        }
      },
      error: (error: any) => {
        console.error('Error fetching initial statistics:', error);
      }
    });
  }

  getCount(): Observable<number> {
    return this.countSubject.asObservable();
  }

  incrementCount(): void {
    const currentValue = this.countSubject.value;
    this.countSubject.next(currentValue + 1);
  }

  decrementCount(): void {
    const currentValue = this.countSubject.value;
    this.countSubject.next(currentValue - 1);
  }
}
