import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../../../components/drawer/sidebar/sidebar.component'

import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../models/shared-module';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-doctorprofile',
  standalone: true,
  imports: [SidebarComponent,StarRatingComponent,CommonModule,FormsModule,SharedModule,RouterModule],
  templateUrl: './doctorprofile.component.html',
  styleUrl: './doctorprofile.component.css'
})
export class DoctorprofileComponent implements OnInit {
  profileData: any;
  errorMessage: string='';
  constructor(private doctorProfileService: DoctorProfileService) {}

  ngOnInit(): void {
    this.doctorProfileService.getProfile().subscribe({
      next: (data) => {
        console.log(data);
        this.profileData = data.data;
        console.log("proooofile",this.profileData);

      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized access. Please login.';
          // Optionally, redirect to login page
          // this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Error fetching profile data. Please try again later.';
        }
      }
    });
  }
}
