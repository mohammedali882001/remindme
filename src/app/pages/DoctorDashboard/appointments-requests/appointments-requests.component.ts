import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppointmentDto } from '../../../models/Appointment/appointment-dto';
import { AppointmentsService } from '../../../services/AppointmentsServices/appointments.service';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../../services/data-sharing-service.service';

@Component({
  selector: 'app-appointments-requests',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './appointments-requests.component.html',
  styleUrl: './appointments-requests.component.css'
})
export class AppointmentsRequestsComponent implements OnInit {
  

  Appointments: AppointmentDto[] = [];
  filterAppointments : AppointmentDto[] = [];
  errorMessage: string = '';
  environment: string = "http://localhost:2100";

  constructor(private appointmentsService : AppointmentsService,
                private dataSharingService : DataSharingService,
                private router : Router,) {
  }

  ngOnInit(): void {
    this.GetPendingRequests();
  }
  
  GetPendingRequests(){
    this.appointmentsService.GetPendingRequests().subscribe({
      next : (response : { isSuccess: boolean; data: AppointmentDto[] }) => {
        this.Appointments = response.data;
        this.filterAppointments = this.Appointments;
        console.log("Pending Requests" , this.Appointments);
      },
      error : (error : any) =>{
        console.error('Error fetching pending Appointments requests:', error);
        this.errorMessage =  'Error fetching pending Appointments requests. Please try again later.';
      }
    })
  }
  

  confirmRequest(appointmentId : number){
    this.appointmentsService.AcceptAppointmentRequest(appointmentId).subscribe({
      next : (response : { isSuccess: boolean; data: string }) => {
        console.log(response.data);
        console.log(response);
        this.filterAppointments = this.filterAppointments.filter(appointment => appointment.id !== appointmentId);
        this.dataSharingService.incrementAcceptedAppointmentsCount();
      },
      error (error : any){
        console.error(error);
      }
    })
  }

  
  rejectRequest(appointmentId : number){

    this.appointmentsService.RejectAppointmentRequest(appointmentId).subscribe({
      next : (response : { isSuccess: boolean; data: string }) => {
        console.log(response.data);
        console.log(response);
        this.filterAppointments = this.filterAppointments.filter(appointment => appointment.id !== appointmentId);
      },
      error (error : any){
        console.error(error);
      }
    })
  }


  
  patientDetails(patientId : number) : void{
    console.log(patientId);
    this.router.navigateByUrl(`VisitedPatientprofile/:${patientId}`);
  }


}
