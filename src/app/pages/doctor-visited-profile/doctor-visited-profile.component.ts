import { Component, OnInit, Renderer2 } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-doctor-visited-profile',
    standalone: true,
    templateUrl: './doctor-visited-profile.component.html',
    styleUrl: './doctor-visited-profile.component.css',
    imports: [SidebarComponent, VisitedSideBarComponent ,CommonModule,FormsModule,RouterLink, WhatsappChatComponent, WhatsappChatWithDoctorComponent,SharedModule, StarRatingComponent]
})
// export class DoctorVisitedProfileComponent implements OnInit {
//   doctor: any;
//   doctorId: number = 0;
//   profileData: DoctorGetDTO = {} as DoctorGetDTO;
//   ratings: any[] = [];
//   selectedRating: number = 0;
//   stars: { value: number }[] = Array.from({ length: 5 }, (_, index) => ({ value: index + 1 }));

//   constructor(
//     private route: ActivatedRoute,
//     private doctorVisitedService: DoctorVisitedProfileService,
//     private http: HttpClient
//   ) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.doctorId = +params['id']; // Get doctor ID from route parameters
//       this.fetchDoctorProfile(this.doctorId);
//       this.fetchRatings(this.doctorId);
//     });
//   }

//   fetchDoctorProfile(doctorId: number): void {
//     this.doctorVisitedService.getDoctorById(doctorId).subscribe({
//       next: (response) => {
//         if (response.isSuccess) {
//           this.profileData = response.data;
//           console.log('Doctor Profile:', this.profileData); // Check if data is received
//         } else {
//           console.error('Error: Unsuccessful response', response);
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching doctor profile:', error);
//       }
//     });
//   }

//   openRatingPopup(): void {
//     Swal.fire({
//       title: 'Rate this Doctor',
//       html: `
//         <div>
//           <div class="star-rating">
//             ${this.stars.map(star => `
//               <span class="star"
//                 style="font-size: 2rem; cursor: pointer;"
//                 onclick="window.rateDoctor(${star.value})"
//                 id="star-${star.value}">&#9733;</span>`).join('')}
//           </div>
//           <textarea id="comment" class="swal2-textarea" placeholder="Enter your comment"></textarea>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Submit',
//       didOpen: () => {
//         //window.rateDoctor = (ratingValue: number) => this.rateDoctor(ratingValue);
//       },
//       preConfirm: () => {
//         const ratingValue = this.selectedRating;
//         const comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
//         return { ratingValue, comment };
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.addRating(result.value.ratingValue, result.value.comment);
//       }
//     });
//   }

//   rateDoctor(ratingValue: number): void {
//     this.selectedRating = ratingValue;
//     this.updateStarDisplay();
//   }

//   updateStarDisplay(): void {
//     this.stars.forEach(star => {
//       const starElement = document.getElementById(`star-${star.value}`);
//       if (starElement) {
//         starElement.style.color = star.value <= this.selectedRating ? 'orange' : 'gray';
//       }
//     });
//   }

//   addRating(ratingValue: number, comment: string): void {
//     const ratingData = {
//       doctorId: this.doctorId,
//       ratingValue,
//       comment
//     };

//     this.doctorVisitedService.addRating(ratingData).subscribe({
//       next: (response) => {
//         if (response.isSuccess) {
//           Swal.fire('Success', 'Rating Added Successfully', 'success');
//           this.fetchDoctorProfile(this.doctorId); // Refresh doctor profile to show updated ratings
//         } else {
//           Swal.fire('Error', 'Failed to add rating', 'error');
//         }
//       },
//       error: (error) => {
//         console.error('Error adding rating:', error);
//         Swal.fire('Error', 'An error occurred', 'error');
//       }
//     });
//   }

//   fetchRatings(doctorId: number): void {
//     this.doctorVisitedService.getRatingsForDoctor(doctorId).subscribe({
//       next: (response) => {
//         console.log("res",response);
//         if (response.isSuccess) {
//           this.ratings = response.data;
//         } else {
//           console.error('Error fetching ratings:', response);
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching ratings:', error);
//       }
//     });
//   }
// }

export class DoctorVisitedProfileComponent implements OnInit {
  doctorId: number = 0;
  profileData: DoctorGetDTO = {} as DoctorGetDTO;
  ratings: any[] = [];
  selectedRating: number = 0;
  stars: { value: number }[] = Array.from({ length: 5 }, (_, index) => ({ value: index + 1 }));
  canAddRating: boolean = true;
  viewAllRatings: boolean = false;
dimg="http://localhost:2100/images/a290b2e1-295b-4940-8fb9-f3759d65eb11_Capture2.PNG"
  constructor(
    private route: ActivatedRoute,
    private doctorVisitedService: DoctorVisitedProfileService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id']; // Get doctor ID from route parameters
      this.fetchDoctorProfile(this.doctorId);
      this.fetchRatings(this.doctorId);
      this.checkAuthorizationToAddRating(this.doctorId);
    });
  }
  getImageUrl(): string {
    return environment.ImgbaseUrl;
  }

  checkAuthorizationToAddRating(doctorId: number): void {
    this.doctorVisitedService.checkAuthorizationToAddRating(doctorId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.canAddRating = true;
        } else {
          this.canAddRating = false;
        }
      },
      error: (error) => {
        console.error('Error checking authorization to add rating:', error);
      }
    });
  }

  fetchDoctorProfile(doctorId: number): void {
    this.doctorVisitedService.getDoctorById(doctorId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log("res",response.data);

          this.profileData = response.data;
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error) => {
        console.error('Error fetching doctor profile:', error);
      }
    });
  }

  openRatingPopup(): void {
    Swal.fire({
      title: 'Rate this Doctor',
      html: `
        <div>
          <div class="star-rating" id="star-rating-container">
            ${this.stars.map(star => `
              <span class="star"
                style="font-size: 2rem; cursor: pointer;"
                data-value="${star.value}"
                id="star-${star.value}">&#9733;</span>`).join('')}
          </div>
          <textarea id="comment" class="swal2-textarea" placeholder="Enter your comment"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      didOpen: () => {
        this.addStarClickListeners();
        this.updateStarDisplay(); // Update stars display on popup open
      },
      preConfirm: () => {
        const ratingValue = this.selectedRating;
        const comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
        return { ratingValue, comment };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.addRating(result.value.ratingValue, result.value.comment);
      }
    });
  }

  addStarClickListeners(): void {
    const container = document.getElementById('star-rating-container');
    if (container) {
      const stars = container.querySelectorAll('.star');
      stars.forEach(star => {
        this.renderer.listen(star, 'click', () => {
          const value = parseInt(star.getAttribute('data-value') || '0', 10);
          this.rateDoctor(value);
        });
      });
    }
  }

  rateDoctor(ratingValue: number): void {
    this.selectedRating = ratingValue;
    this.updateStarDisplay();
  }

  updateStarDisplay(): void {
    this.stars.forEach(star => {
      const starElement = document.getElementById(`star-${star.value}`);
      if (starElement) {
        starElement.style.color = star.value <= this.selectedRating ? 'orange' : 'gray';
      }
    });
  }

  addRating(ratingValue: number, comment: string): void {
    const ratingData = {
      doctorId: this.doctorId,
      ratingValue,
      comment
    };

    this.doctorVisitedService.addRating(ratingData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          Swal.fire('Success', 'Rating Added Successfully', 'success');
          this.fetchDoctorProfile(this.doctorId); // Refresh doctor profile to show updated ratings
        } else {
          Swal.fire('Error', 'Failed to add rating', 'error');
        }
      },
      error: (error) => {
        console.error('Error adding rating:', error);
        Swal.fire('Error', 'An error occurred', 'error');
      }
    });
  }

  fetchRatings(doctorId: number): void {
    this.doctorVisitedService.getRatingsForDoctor(doctorId).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.ratings = response.data;
        } else {
          console.error('Error fetching ratings:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching ratings:', error);
      }
    });
  }
}

