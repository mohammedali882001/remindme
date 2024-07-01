import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/drawer/sidebar/sidebar.component';
import { DonightChartComponent } from "../../../components/DonughtChart/donight-chart/donight-chart.component";
import { CommonModule } from '@angular/common';
import { DoctorDataDto } from '../../../models/Doctor/doctor-data-dto';
import { AdminDashboardService } from '../../../services/AdminServices/admin-dashboard.service';
import { responsiveFontSizes } from '@mui/material';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [SidebarComponent, DonightChartComponent, CommonModule]
})
export class AdminDashboardComponent implements OnInit {

  Doctors : DoctorDataDto[] = [];
  filterDoctors : DoctorDataDto[] = [];
  errorMessage : string = '';
  patientsCount! : number;
  doctorsCount! : number;
  environment: string = "http://localhost:2100";

  constructor(private adminDashboardService : AdminDashboardService, private router : Router) {
     
  }
  ngOnInit(): void {
    this.getDoctorsRequests();
    this.getPatientsCount();
    this.getDoctorsCount();

  }

  getDoctorsRequests(): void {
    this.adminDashboardService.getDoctorsRequests().subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log(response.data);
          this.Doctors = response.data;
          this.filterDoctors = this.Doctors;
        } else {
          console.error('Error: Unsuccessful response', response);
          this.errorMessage = 'Error fetching doctors requests. Please try again later.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching doctors requests:', error);
        this.errorMessage = 'Error fetching doctors requests. Please try again later.';
      }
    });
  }

  getPatientsCount(){
    this.adminDashboardService.getPatientsCount().subscribe({
      next : (response) => {
        console.log(response);
        this.patientsCount = response.data;
      },
      error : (response) => {
        console.error('Error: Unsuccessful response', response);
        this.errorMessage = 'Error fetching patients count. Please try again later.';
      }
      
    })
  }

  getDoctorsCount(){
    this.adminDashboardService.getDoctorsCount().subscribe({
      next : (response) => {
        console.log(response);
        this.doctorsCount = response.data;
      },
      error : (response) => {
        console.error('Error: Unsuccessful response', response);
        this.errorMessage = 'Error fetching doctors count. Please try again later.';
      }
      
    })
  }

  confirmRequest(doctorId: number): void {
    this.adminDashboardService.confirmRequest(doctorId).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log('Request accepted successfully');
          this.filterDoctors = this.filterDoctors.filter(doctor => doctor.id !== doctorId);
          this.refreshCounts();
          //this.dataSharingService.incrementCount(); // Update count in DataSharingService
          // Optionally, emit an event if needed
         // this.confirmOrRejectEvent.emit(1);
        } else {
          console.error('Error: Request acceptance failed', response);
          // Handle error scenarios here
        }
      },
      error: (error: any) => {
        console.error('Error confirming request:', error);
        // Handle error scenarios here
      },
      // complete:()=>{
      //   this.getDoctorsCount();
      // }
    });
  }

  rejectRequest(doctorId: number): void {
    this.adminDashboardService.rejectRequest(doctorId).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          console.log('Request rejected successfully');
          this.filterDoctors = this.filterDoctors.filter(patient => patient.id !== doctorId);
          //this.dataSharingService.decrementCount(); // Update count in DataSharingService
          // Optionally, emit an event if needed
         // this.confirmOrRejectEvent.emit(1);
        } else {
          console.error('Error: Request reject failed', response);
          // Handle error scenarios here
        }
      },
      error: (error: any) => {
        console.error('Error rejecting request:', error);
        // Handle error scenarios here
      }
    });
  }



  refreshCounts(): void {
    this.getDoctorsCount();
    this.getPatientsCount();
  }
  
  doctorDetails(doctorId : number){
    console.log(doctorId);
    this.router.navigateByUrl(`VisitedDoctorprofile/:${doctorId}`);
  }


  }

