import { Component } from '@angular/core';
import { DoctorFilterComponent } from "../../components/doctor-filter/doctor-filter.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [DoctorFilterComponent]
})
export class HomeComponent {

}
