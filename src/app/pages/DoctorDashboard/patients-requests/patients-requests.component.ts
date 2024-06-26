import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PatientDetailsDto } from '../../../models/Doctor/patient-details-dto';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { CommonModule } from '@angular/common';
import { DoctorDashboardService } from '../../../services/DoctorServices/doctor-dashboard.service';

@Component({
  selector: 'app-patients-requests',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './patients-requests.component.html',
  styleUrls: ['./patients-requests.component.css'] // Make sure the styleUrls path is correct
})
export class PatientsRequestsComponent implements OnInit {

  patients: PatientDetailsDto[] = [];
  errorMessage: string = '';
  environment : string = "http://localhost:2100";
  constructor(private doctorDashboardService: DoctorDashboardService) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.doctorDashboardService.getPatientsRequests().subscribe({
      next: (response: { isSuccess: boolean; data: PatientDetailsDto[] }) => {
        if (response.isSuccess) {
          this.patients = response.data;
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



  confirmRequest(patientId: number): void {
    // Implement confirm request logic here
    console.log('Confirm request for patient ID:', patientId);
  }

  rejectRequest(patientId: number): void {
    // Implement reject request logic here
    console.log('Reject request for patient ID:', patientId);
  }
}
