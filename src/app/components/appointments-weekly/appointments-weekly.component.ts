import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/AppointmentsServices/appointments.service';
import { AppointmentDto } from '../../models/Appointment/appointment-dto';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../models/shared-module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments-weekly',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe, RouterLink, SharedModule],
  templateUrl: './appointments-weekly.component.html',
  styleUrls: ['./appointments-weekly.component.css']
})
export class AppointmentsWeeklyComponent implements OnInit {

  Appointments: AppointmentDto[] = [];
  filterAppointments: AppointmentDto[] = [];
  errorMessage: string = '';
  environment: string = "http://localhost:2100";

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.GetAcceptedAppointments();
  }

  GetAcceptedAppointments(): void {
    this.appointmentsService.GetAcceptedAppointments().subscribe({
      next: (response: { isSuccess: boolean; data: AppointmentDto[] }) => {
        this.Appointments = response.data;
        this.filterAppointments = this.Appointments;
        console.log("Accepted Appointments", this.Appointments);
      },
      error: (error: any) => {
        console.error('Error fetching Accepted Appointments requests:', error);
        this.errorMessage = 'Error fetching Accepted Appointments requests. Please try again later.';
      }
    });
  }

  DeleteAppointments(appointmentId: number): void {
    this.appointmentsService.DeleteAppointmentFromDoctor(appointmentId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log(response.data);
          console.log(response);
          this.filterAppointments = this.filterAppointments.filter(appointment => appointment.id !== appointmentId);

          Swal.fire({
            position: "center",
            icon: "success",
            title: 'Appointment Declined',
            text: 'You have successfully declined the appointment.',
            showConfirmButton: true,
          });
        } else {
          console.error('Error: Appointment rejection failed', response);
        }
      },
      error: (error: any) => {
        console.error('Error rejecting appointment:', error);
      }
    });
  }
}
