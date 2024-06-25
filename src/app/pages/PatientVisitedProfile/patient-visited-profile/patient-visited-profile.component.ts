import { Component, OnInit } from '@angular/core';
import { RelativeDTO } from '../../../models/Patient/relative-dto';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientVisitedProfileService } from '../../../services/PatientServices/patient-visited-profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-visited-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-visited-profile.component.html',
  styleUrl: './patient-visited-profile.component.css'
})
export class PatientVisitedProfileComponent implements OnInit {
  patientId: number = 0;
  profileDataReport: any = {};
  profileData: RelativeDTO = new RelativeDTO();
  loggedInDoctorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private doctorProfileService: DoctorProfileService,
    private patientVisitedProfileService: PatientVisitedProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // Get patient ID from route parameters
      this.fetchRelativeProfile(this.patientId); // Fetch patient details based on ID
      this.fetchProfileAndReports(this.patientId);
      this.fetchLoggedInDoctorId();
    });
  }

  fetchRelativeProfile(patientId: number): void {
    this.doctorProfileService.getRelativeProfile(patientId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.profileData = response.data;
          console.log('Relative Profile:', this.profileData); // Check if data is received
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error) => {
        console.error('Error fetching relative profile:', error);
      }
    });
  }

  fetchProfileAndReports(patientId: number): void {
    this.patientVisitedProfileService.getAllReports(patientId).subscribe({
      next: (reports) => {
        this.profileDataReport.reports = reports.data;
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
  }

  fetchLoggedInDoctorId(): void {
    this.patientVisitedProfileService.getLoggedInDoctorId().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.loggedInDoctorId = response.data;
        }
      },
      error: (error) => {
        console.error('Error fetching logged-in doctor ID:', error);
      }
    });
  }

  addReport(patientId: number): void {
    Swal.fire({
      title: 'Add Report',
      html: `
        <input id="add-title" class="swal2-input" placeholder="Title">
        <textarea id="add-description" class="swal2-textarea" placeholder="Description"></textarea>
      `,
      preConfirm: () => {
        const title = (document.getElementById('add-title') as HTMLInputElement).value;
        const description = (document.getElementById('add-description') as HTMLTextAreaElement).value;
        return { title, description };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const reportDTO = {
          title: result.value.title,
          description: result.value.description
        };
        this.patientVisitedProfileService.addReport(patientId, reportDTO).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire('Added!', 'Report has been added successfully.', 'success');
              // Optionally, fetch updated profile data after adding the report
              this.fetchProfileAndReports(patientId);
            } else {
              Swal.fire('Error!', 'Failed to add report.', 'error');
            }
          },
          error: (error) => {
            console.error('Error adding report:', error);
            Swal.fire('Error!', 'Failed to add report. Please try again later.', 'error');
          }
        });
      }
    });
  }

  viewReport(reportId: number): void {
    this.patientVisitedProfileService.viewReport(reportId).subscribe({
      next: (response) => {
        const report = response.data;
        Swal.fire({
          title: report.title,
          html: `
            <p>Description: ${report.description}</p>
            <p>Patient Name: ${report.patientName}</p>
            <p>Doctor Name: ${report.doctorName}</p>
            <p>Date: ${report.dateTime}</p>
            <div id="edit-delete-buttons">
              ${this.loggedInDoctorId === report.doctorID ? `
                <button id="edit-button" class="swal2-confirm swal2-styled">Edit</button>
                <button id="delete-button" class="swal2-cancel swal2-styled">Delete</button>
              ` : ''}
            </div>
          `,
          didRender: () => {
            if (this.loggedInDoctorId === report.doctorID) {
              const editButton = document.getElementById('edit-button');
              const deleteButton = document.getElementById('delete-button');

              if (editButton) {
                editButton.addEventListener('click', () => this.editReport(reportId));
              }

              if (deleteButton) {
                deleteButton.addEventListener('click', () => this.deleteReport(reportId));
              }
            }
          }
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

  editReport(reportId: number): void {
    Swal.fire({
      title: 'Edit Report',
      html: `
        <input id="edit-title" class="swal2-input" placeholder="Title">
        <textarea id="edit-description" class="swal2-textarea" placeholder="Description"></textarea>
      `,
      preConfirm: () => {
        const title = (document.getElementById('edit-title') as HTMLInputElement).value;
        const description = (document.getElementById('edit-description') as HTMLTextAreaElement).value;
        return { title, description };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const updateReportDTO = {
          title: result.value.title,
          description: result.value.description
        };
        this.patientVisitedProfileService.updateReport(reportId, updateReportDTO).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire('Updated!', 'Report has been updated.', 'success');
              this.fetchProfileAndReports(this.patientId); // Refresh the reports
            }
          },
          error: (error) => {
            console.error('Error updating report:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update report. Please try again later.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  deleteReport(reportId: number): void {
    console.log('Attempting to delete report with ID:', reportId); // Add this log
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.patientVisitedProfileService.deleteReport(reportId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              // Remove the deleted report from the local array
              this.profileDataReport.reports = this.profileDataReport.reports.filter((report: any) => report.id !== reportId);
              Swal.fire('Deleted!', 'Report has been deleted.', 'success');
            }
          },
          error: (error) => {
            console.error('Error deleting report:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete report. Please try again later.',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}
