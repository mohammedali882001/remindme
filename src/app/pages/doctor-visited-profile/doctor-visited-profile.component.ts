import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/drawer/sidebar/sidebar.component";
import { VisitedSideBarComponent } from "./visited-side-bar/visited-side-bar.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorVisitedProfileService } from '../../services/DoctorServices/doctor-visited-profile.service';
import { DoctorGetDTO } from '../../models/Doctor/doctor-get-dto';
import { WhatsappChatComponent } from "../../components/whatsapp-chat/whatsapp-chat.component";
import { WhatsappChatWithDoctorComponent } from "../../components/whatsapp-chat-with-doctor/whatsapp-chat-with-doctor.component";
import { StarRatingComponent } from "../../components/star-rating/star-rating.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../models/shared-module';


@Component({
    selector: 'app-doctor-visited-profile',
    standalone: true,
    templateUrl: './doctor-visited-profile.component.html',
    styleUrl: './doctor-visited-profile.component.css',
    imports: [SidebarComponent, VisitedSideBarComponent ,CommonModule,FormsModule,RouterLink, WhatsappChatComponent, WhatsappChatWithDoctorComponent,SharedModule, StarRatingComponent]
})
export class DoctorVisitedProfileComponent implements OnInit {
  doctor: any;
  doctorId: number = 0;

  profileData: DoctorGetDTO = {} as DoctorGetDTO;

  constructor(
    private route: ActivatedRoute,
    private doctorVisitedService: DoctorVisitedProfileService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id']; // Get doctor ID from route parameters
      this.fetchDoctorProfile(this.doctorId);
    });
  }

  fetchDoctorProfile(doctorId: number): void {
    this.doctorVisitedService.getDoctorById(doctorId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.profileData = response.data;
          console.log('Doctor Profile:', this.profileData); // Check if data is received
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error) => {
        console.error('Error fetching doctor profile:', error);
      }
    });
  }
}
