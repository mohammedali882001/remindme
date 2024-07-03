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
import { environment } from '../../../../environments/environment.development';

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
  selectedImage: File | null = null;

  constructor(private doctorProfileService: DoctorProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProfileData();
    this.fetchAvailableSlots();
    this.fetchDoctorPatients();
  }

  fetchProfileData(): void {
    this.doctorProfileService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data.data;
      },
      error: (error) => {
        this.handleProfileError(error);
      }
    });
  }

  handleProfileError(error: any): void {
    console.error('Error fetching profile data:', error);
    this.errorMessage = error.status === 401 ? 'Unauthorized access. Please login.' : 'Error fetching profile data. Please try again later.';
  }

  getImageUrl(): string {
    return environment.ImgbaseUrl + this.profileData.picURL;
  }

  fetchAvailableSlots(): void {
    this.doctorProfileService.getAvailableSlots().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.availableSlots = response.data;
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error) => {
        console.error('Error fetching available slots:', error);
      }
    });
  }

  fetchDoctorPatients(): void {
    this.doctorProfileService.getDoctorPatients().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.patients = response.data;
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    if (this.selectedImage) {
      this.uploadImageAndSaveProfile();
    } else {
      this.saveProfileData();
    }
  }

  uploadImageAndSaveProfile(): void {
    this.doctorProfileService.updateDoctorPhoto(this.selectedImage!).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.profileData.picURL = response.data;
          this.saveProfileData();
        } else {
          console.error('Error updating photo:', response.data);
        }
      },
      error: (error) => {
        console.error('Error updating photo:', error);
      }
    });
  }

  saveProfileData(): void {
    this.doctorProfileService.updateDoctorProfile(this.profileData).subscribe({
      next: (response) => {
        this.toggleEditMode();
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }

  cancelEdit(): void {
    this.toggleEditMode();
    this.fetchProfileData();
  }

  selectImage(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  safeSplit(slot: AvailableSlotsDTO, index: number): string {
    return slot?.formattedSlot?.split('\n')[index] ?? '';
  }

  selectPatient(patientId: number | null): void {
    if (patientId !== null) {
      this.selectedPatientId = patientId;
      this.doctorProfileService.getRelativeProfile(patientId).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.relativeProfile = response.data;
            this.router.navigate(['/VisitedPatientprofile', patientId]); // Navigate to patient profile using selected patient ID
          } else {
            console.error('Error: Unsuccessful response', response);
          }
        },
        error: (error) => {
          console.error('Error fetching relative profile:', error);
        }
      });
    } else {
      console.warn('selectedPatientId is null.');
    }
  }
}
