import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../../../components/drawer/sidebar/sidebar.component'
import { DonightChartComponent } from '../../../components/DonughtChart/donight-chart/donight-chart.component';
import { AppointmentsRequestsComponent } from '../appointments-requests/appointments-requests.component';
import { PatientsRequestsComponent } from '../patients-requests/patients-requests.component';
import { RouterOutlet } from '@angular/router';
import { DoctorDashBoardDto } from '../../../models/doctor-dash-board-dto';
import { DoctorDashboardService } from '../../../services/DoctorServices/doctor-dashboard.service';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../../../services/data-sharing-service.service';
import { AppointmentsService } from '../../../services/AppointmentsServices/appointments.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [SidebarComponent, DonightChartComponent, RouterOutlet,AppointmentsRequestsComponent,PatientsRequestsComponent ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  errorMessage: string = '';
  //statistics!: DoctorDashBoardDto;
   numberOfPatients : number = 0;
   numberOfAcceptedAppointments : number = 0;
   numberOfPendingAppointments : number = 0; 
  private PatientscountSubscription: Subscription | undefined;
  private AcceptedAppointmentscountSubscription: Subscription | undefined;

  constructor(
    private doctorDashboardService: DoctorDashboardService,
    private dataSharingService: DataSharingService, 
    private AppointmentsService : AppointmentsService
  ) {}

  ngOnInit(): void {
    this.getStatistics();
    this.getAcceptedAppointmentsAccount();
    this.PatientscountSubscription = this.dataSharingService.getCount().subscribe((count: number) => {
     
        this.numberOfPatients = count;
    });

    this.AcceptedAppointmentscountSubscription = this.dataSharingService.getAcceptedAppointmentsCount().subscribe((count: number) => {
      
        this.numberOfAcceptedAppointments = count;
      
    });

  }


  getAcceptedAppointmentsAccount(){
    this.AppointmentsService.GetAcceptAppointmentsCount().subscribe({
      next : (response : { isSuccess: boolean; data: number }) => {
        this.numberOfAcceptedAppointments = response.data;
        console.log(response);
        console.log(response.data);
      },
      error : (error : any) => {
        console.error(error);
      }
    })
  }

  getStatistics(): void {
    this.doctorDashboardService.getStatistics().subscribe({
      next: (response: { isSuccess: boolean; data: number }) => {
        if (response.isSuccess) {
          this.numberOfPatients = response.data;
          console.log("Statistics", this.numberOfPatients);
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



  ngOnDestroy(): void {
    if (this.PatientscountSubscription) {
      this.PatientscountSubscription.unsubscribe();
    }
  }
}
