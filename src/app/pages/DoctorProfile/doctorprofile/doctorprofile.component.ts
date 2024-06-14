import { Component } from '@angular/core';
import {SidebarComponent} from '../../../components/drawer/sidebar/sidebar.component'
import {StarRatingComponent} from '../../../components/Ranting/star-rating/star-rating.component'
@Component({
  selector: 'app-doctorprofile',
  standalone: true,
  imports: [SidebarComponent,StarRatingComponent],
  templateUrl: './doctorprofile.component.html',
  styleUrl: './doctorprofile.component.css'
})
export class DoctorprofileComponent {

}
