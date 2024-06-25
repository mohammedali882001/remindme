import { Component, OnInit } from '@angular/core';
import { RelativeDTO } from '../../../models/Patient/relative-dto';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-visited-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-visited-profile.component.html',
  styleUrl: './patient-visited-profile.component.css'
})
export class PatientVisitedProfileComponent implements OnInit {
  patientId: number=0;
  profileData: RelativeDTO = new RelativeDTO();

  constructor(private route: ActivatedRoute, private doctorProfileService: DoctorProfileService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // Get patient ID from route parameters
      this.fetchRelativeProfile(this.patientId); // Fetch patient details based on ID
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
          // Handle error if necessary
        }
      },
      error: (error) => {
        console.error('Error fetching relative profile:', error);
        // Handle error if necessary
      }
    });
  }
}
