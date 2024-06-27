import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../../../components/drawer/sidebar/sidebar.component'
import { DonightChartComponent } from '../../../components/DonughtChart/donight-chart/donight-chart.component';
import { AppointmentsRequestsComponent } from '../appointments-requests/appointments-requests.component';
import { PatientsRequestsComponent } from '../patients-requests/patients-requests.component';
import { RouterOutlet } from '@angular/router';
import { DoctorDashBoardDto } from '../../../models/doctor-dash-board-dto';
import { DoctorDashboardService } from '../../../services/DoctorServices/doctor-dashboard.service';


@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [SidebarComponent, DonightChartComponent, RouterOutlet,AppointmentsRequestsComponent,PatientsRequestsComponent ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  errorMessage: string = '';
  statistics! : DoctorDashBoardDto;

 
  constructor(private doctorDashboardService: DoctorDashboardService) {}
  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.doctorDashboardService.getStatistics().subscribe({
      next: (response: { isSuccess: boolean; data: DoctorDashBoardDto }) => {
        if (response.isSuccess) {
          this.statistics = response.data;
          console.log("Statistics", this.statistics);
        } else {
          console.error('Error: Unsuccessful response', response);
          this.errorMessage = 'Error fetching statistics. Please try again later.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching statistics:', error);
        this.errorMessage = 'Error fetching statistics. Please try again later.';
      }
    });
  }


}
