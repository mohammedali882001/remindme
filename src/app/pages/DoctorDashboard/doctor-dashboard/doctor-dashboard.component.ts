import { Component } from '@angular/core';

import {SidebarComponent} from '../../../components/drawer/sidebar/sidebar.component'
import {DonightChartComponent} from '../../../components/DonughtChart/donight-chart/donight-chart.component'

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [SidebarComponent,DonightChartComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

}
