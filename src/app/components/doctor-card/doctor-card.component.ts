import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from '../../services/DoctorServices/doctor.service';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseSharedService } from '../../services/browse-shared.service';

@Component({
    selector: 'app-doctor-card',
    standalone: true,
    templateUrl: './doctor-card.component.html',
    styleUrls: ['./doctor-card.component.css'],
    imports: [CommonModule, RouterLink, StarRatingComponent,FormsModule,ReactiveFormsModule]
})
export class DoctorCardComponent implements OnInit {
  searchForm: FormGroup;
  // filteredDoctors: FilterDoctorDTO[] = [];

  @Input() filteredDoctors: FilterDoctorDTO[] = [];

  constructor(private fb: FormBuilder,
    private doctorService: DoctorService,
    private sharedService: BrowseSharedService
  ) {
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
        console.log("from load",response);

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

