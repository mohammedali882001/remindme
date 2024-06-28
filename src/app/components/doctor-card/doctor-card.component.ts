import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/DoctorServices/doctor.service';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-doctor-card',
    standalone: true,
    templateUrl: './doctor-card.component.html',
    styleUrls: ['./doctor-card.component.css'],
    imports: [CommonModule, RouterLink, StarRatingComponent,FormsModule,ReactiveFormsModule]
})
// export class DoctorCardComponent implements OnInit {
//   filteredDoctors: FilterDoctorDTO[] = [];
//   searchText: string = '';

//   constructor(private doctorService: DoctorService) {}

//   ngOnInit() {
//     this.loadDoctors();
//   }

//   loadDoctors() {
//     this.doctorService.getDoctors().subscribe(
//       (data: FilterDoctorDTO[]) => {
//         this.filteredDoctors = data;
//       },
//       (error) => {
//         console.error('Error fetching doctors:', error);
//       }
//     );
//   }

//   searchDoctors() {
//     if (this.searchText.trim() !== '') {
//       this.doctorService.searchDoctorsByName(this.searchText.trim()).subscribe(
//         (response) => {
//           if (response.isSuccess) {
//             this.filteredDoctors = response.data;
//           } else {
//             console.error('Search failed:', response.data);
//           }
//         },
//         (error) => {
//           console.error('Error searching doctors:', error);
//         }
//       );
//     } else {
//       this.loadDoctors(); // Reload all doctors if search text is empty
//     }
//   }
// }


export class DoctorCardComponent implements OnInit {
  searchForm: FormGroup;
  filteredDoctors: FilterDoctorDTO[] = [];

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.searchForm = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit() {
    this.loadDoctors(); // Initial load of all doctors
    this.watchSearchInput(); // Watch for changes in search input
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(
      (response: FilterDoctorDTO[]) => {
        this.filteredDoctors = response; // Update filteredDoctors with fetched data
      },
      (error) => {
        console.error('Error fetching doctors:', error); // Log error if fetch fails
      }
    );
  }

  watchSearchInput() {
    this.searchForm.get('searchText')?.valueChanges.subscribe(
      (value: string) => {
        if (value.trim() !== '') {
          this.searchDoctors(value.trim()); // Perform search if search text is not empty
        } else {
          this.loadDoctors(); // Reload all doctors if search text is empty
        }
      }
    );
  }

  searchDoctors(searchText: string) {
    this.doctorService.searchDoctorsByName(searchText).subscribe(
      (response: FilterDoctorDTO[]) => {
        this.filteredDoctors = response; // Update filteredDoctors with search results
      },
      (error) => {
        console.error('Error searching doctors:', error); // Log error if search request fails
      }
    );
  }
}
