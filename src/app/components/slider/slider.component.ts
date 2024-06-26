import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorProfileService } from '../../services/DoctorServices/doctor-profile.service';
import { DoctorGetDTO } from '../../models/Doctor/doctor-get-dto';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  doctors: DoctorGetDTO[] = [];
  environment : string = "http://localhost:2100";
  constructor(private _doctorProfileService: DoctorProfileService) {}

  ngOnInit(): void {
    this.getMaxAverage();
  }

  getMaxAverage(): void {
    this._doctorProfileService.getMaxAverageRating().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log(response.data);
          this.doctors = response.data;

        } else {
          console.error(response.data);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
