import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PatientDetailsDto } from '../../../models/Doctor/patient-details-dto';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { CommonModule } from '@angular/common';
import { DoctorDashboardService } from '../../../services/DoctorServices/doctor-dashboard.service';
import { DataSharingService } from '../../../services/data-sharing-service.service';

@Component({
  selector: 'app-patients-requests',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './patients-requests.component.html',
  styleUrls: ['./patients-requests.component.css'] // Make sure the styleUrls path is correct
})
export class PatientsRequestsComponent implements OnInit {

  patients: PatientDetailsDto[] = [];
  filterPatients: PatientDetailsDto[] = [];
  errorMessage: string = '';
  environment: string = "http://localhost:2100";
  @Output() confirmOrRejectEvent: EventEmitter<number>;

  constructor(
    private doctorDashboardService: DoctorDashboardService,
    private dataSharingService: DataSharingService
  ) {
    this.confirmOrRejectEvent = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.doctorDashboardService.getPatientsRequests().subscribe({
      next: (response: { isSuccess: boolean; data: PatientDetailsDto[] }) => {
        if (response.isSuccess) {
          this.patients = response.data;
          this.filterPatients = this.patients;
          console.log("Patients Requests", this.patients);
        } else {
          console.error('Error: Unsuccessful response', response);
          this.errorMessage = 'Error fetching patients requests. Please try again later.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching patients requests:', error);
        this.errorMessage = 'Error fetching patients requests. Please try again later.';
      }
    });
  }

  confirmRequest(requestId: number): void {
    this.doctorDashboardService.confirmRequest(requestId).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log('Request accepted successfully');
          this.filterPatients = this.filterPatients.filter(patient => patient.id !== requestId);
          this.dataSharingService.incrementCount(); // Update count in DataSharingService
          // Optionally, emit an event if needed
          this.confirmOrRejectEvent.emit(1);
        } else {
          console.error('Error: Request acceptance failed', response);
          // Handle error scenarios here
        }
      },
      error: (error: any) => {
        console.error('Error confirming request:', error);
        // Handle error scenarios here
      }
    });
  }

  rejectRequest(requestId: number): void {
    this.doctorDashboardService.rejectRequest(requestId).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log('Request rejected successfully');
          this.filterPatients = this.filterPatients.filter(patient => patient.id !== requestId);
          this.dataSharingService.decrementCount(); // Update count in DataSharingService
          // Optionally, emit an event if needed
          this.confirmOrRejectEvent.emit(1);
        } else {
          console.error('Error: Request reject failed', response);
          // Handle error scenarios here
        }
      },
      error: (error: any) => {
        console.error('Error rejecting request:', error);
        // Handle error scenarios here
      }
    });
  }
}
