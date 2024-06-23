import { Component } from '@angular/core';

import {SidebarComponent} from '../../../components/drawer/sidebar/sidebar.component'

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

}
