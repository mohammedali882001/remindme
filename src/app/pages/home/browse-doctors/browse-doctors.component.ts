import { Component } from '@angular/core';
import { DoctorFilterComponent } from "../../../components/doctor-filter/doctor-filter.component";
import { DoctorCardComponent } from "../../../components/doctor-card/doctor-card.component";




@Component({
    selector: 'app-browse-doctors',
    standalone: true,
    templateUrl: './browse-doctors.component.html',
    styleUrl: './browse-doctors.component.css',
    imports: [DoctorFilterComponent, DoctorCardComponent]
})
export class BrowseDoctorsComponent {

}
