import { Component, OnInit } from '@angular/core';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { AvailableSlotsDTO } from '../../../models/Doctor/available-slots-dto';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/drawer/sidebar/sidebar.component';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../models/shared-module';
import { Router, RouterModule } from '@angular/router';
import { PatientNameDTO } from '../../../models/Doctor/patient-name-dto';
import { GeneralResponse } from '../../../models/Story/general-response';
import { RelativeDTO } from '../../../models/Patient/relative-dto';

@Component({
  selector: 'app-doctorprofile',
  standalone: true,
  imports: [SidebarComponent, StarRatingComponent, CommonModule, FormsModule, SharedModule, RouterModule],
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
  profileData: any;
  availableSlots: AvailableSlotsDTO[] = [];
  errorMessage: string = '';
  editMode: boolean = false;
  patients: PatientNameDTO[] = [];
  selectedPatientId: number | null = null;
  relativeProfile: RelativeDTO | null = null;

  constructor(private doctorProfileService: DoctorProfileService,private router: Router) {}

  ngOnInit(): void {
    this.doctorProfileService.getProfile().subscribe({
      next: (data) => {
        console.log(data);
        this.profileData = data.data;
        console.log("proooofile", this.profileData);
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

    this.fetchAvailableSlots();
    this.fetchDoctorPatients();
  }

  fetchAvailableSlots(): void {
    this.doctorProfileService.getAvailableSlots().subscribe({
      next: (response: { isSuccess: boolean; data: AvailableSlotsDTO[] }) => {
        if (response.isSuccess) {
          this.availableSlots = response.data;
          console.log("Available Slots", this.availableSlots);
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching available slots:', error);
      }
    });
  }
  fetchDoctorPatients(): void {
    this.doctorProfileService.getDoctorPatients().subscribe({
      next: (response: { isSuccess: boolean; data: PatientNameDTO[] }) => {
        if (response.isSuccess) {
          this.patients = response.data;
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    this.doctorProfileService.updateDoctorProfile(this.profileData).subscribe({
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
    this.doctorProfileService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data.data;
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      }
    });
  }

  safeSplit(slot: AvailableSlotsDTO, index: number): string {
    return slot?.formattedSlot?.split('\n')[index] ?? '';
  }

  selectPatient(patientId: number | null): void {
    if (patientId !== null) {
      this.selectedPatientId = patientId;
      this.doctorProfileService.getRelativeProfile(patientId).subscribe({
        next: (response: GeneralResponse<RelativeDTO>) => {
          if (response.isSuccess) {
            this.relativeProfile = response.data;
            // Assuming you have a route named 'patient-profile' defined in your router configuration
            this.router.navigate(['/VisitedPatientprofile', patientId]); // Navigate to patient profile using selected patient ID
          } else {
            console.error('Error: Unsuccessful response', response);
            // Handle error if necessary
          }
        },
        error: (error: any) => {
          console.error('Error fetching relative profile:', error);
          // Handle error if necessary
        }
      });
    } else {
      console.warn('selectedPatientId is null.');
      // Handle the case where selectedPatientId is null if needed
    }
  }

}
