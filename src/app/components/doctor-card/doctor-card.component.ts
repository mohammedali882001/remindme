import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/DoctorServices/doctor.service';
import { FilterDoctorDTO } from '../../models/Doctor/filter-doctor-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from "../star-rating/star-rating.component";

@Component({
    selector: 'app-doctor-card',
    standalone: true,
    templateUrl: './doctor-card.component.html',
    styleUrls: ['./doctor-card.component.css'],
    imports: [CommonModule, RouterLink, StarRatingComponent]
})
export class DoctorCardComponent implements OnInit {
  filteredDoctors: FilterDoctorDTO[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getDoctors().subscribe((data: FilterDoctorDTO[]) => {
      console.log(data);

      this.filteredDoctors = data;
      console.log(this.filteredDoctors);

    });
  }

}
