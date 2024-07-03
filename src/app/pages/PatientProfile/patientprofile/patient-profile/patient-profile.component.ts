import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../services/PatientServices/patient.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../models/shared-module';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { WhatsappChatWithDoctorComponent } from "../../../../components/whatsapp-chat-with-doctor/whatsapp-chat-with-doctor.component";
import { WhatsappChatWithMyDoctorComponent } from "../../../../components/whatsapp-chat-with-my-doctor/whatsapp-chat-with-my-doctor.component";
import { RouterLink } from '@angular/router';
import { AppointmentOfPatient } from '../../../../models/Patient/appointment-of-patient';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
  imports: [CommonModule, SharedModule, FormsModule, WhatsappChatWithDoctorComponent, WhatsappChatWithMyDoctorComponent, RouterLink]
})
export class PatientProfileComponent implements OnInit {
  profileData: any;
  errorMessage: string = '';
  editMode: boolean = false;
  appointments: AppointmentOfPatient[] = [];
  selectedFile: File | null = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchProfileAndReports();
    this.fetchUpcomingAppointment();
  }

  fetchUpcomingAppointment(): void {
    this.patientService.getAppointmentsOfPatient().subscribe({
      next: (response) => {
        console.log(response);
        this.appointments = response.data;
      },
      error: (error) => {
        console.error('Error fetching upcoming appointment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch upcoming appointment. Please try again later.'
        });
      }
    });
  }

  getImageUrl(): string {
    return environment.ImgbaseUrl;
  }

  fetchProfileAndReports(): void {
    this.patientService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data.data;
        console.log("Data from patient", this.profileData);
        this.patientService.getAllReports().subscribe({
          next: (reports) => {
            this.profileData.reports = reports.data;
          },
          error: (error) => {
            console.error('Error fetching reports:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to fetch reports. Please try again later.'
            });
          }
        });
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized access. Please login.';
        } else {
          this.errorMessage = 'Error fetching profile data. Please try again later.';
        }
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('Image', this.selectedFile);

      this.patientService.updatePhoto(formData).subscribe({
        next: (response) => {
          console.log('Photo updated successfully:', response);
          this.profileData.patientPicURL = response.data;
          this.updateProfileData();
        },
        error: (error) => {
          console.error('Error updating photo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to update photo. Please try again later.'
          });
        }
      });
    } else {
      this.updateProfileData();
    }
  }

  updateProfileData(): void {
    this.patientService.updatePatientProfile(this.profileData).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.toggleEditMode();
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }

  cancelEdit(): void {
    this.toggleEditMode();
    this.fetchProfileAndReports(); // Reload profile data on cancel
  }

  viewReport(reportId: number): void {
    this.patientService.viewReport(reportId).subscribe({
      next: (response) => {
        const report = response.data;
        Swal.fire({
          title: report.title,
          html: `
            <p>Description: ${report.description}</p>
            <p>Patient Name: ${report.patientName}</p>
            <p>Doctor Name: ${report.doctorName}</p>
            <p>Date: ${report.dateTime}</p>
          `
        });
      },
      error: (error) => {
        console.error('Error fetching report:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch report details. Please try again later.',
          icon: 'error'
        });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
