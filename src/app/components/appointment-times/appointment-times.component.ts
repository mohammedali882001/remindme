import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-times',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-times.component.html',
  styleUrl: './appointment-times.component.css'
})
export class AppointmentTimesComponent {
appointments = [
  { day: 'Sunday', times: ['10:00 AM', '11:00 AM',  '12:00 PM', '1:00 PM'] },
  { day: 'Monday', times: ['10:00 AM', '11:00 AM',  '12:00 PM', '1:00 PM']},
  { day: 'Tuesday', times: ['10:00 AM', '11:00 AM',  '12:00 PM', '1:00 PM']},
  { day: 'Wednesday', times: ['10:00 AM', '11:00 AM',  '12:00 PM', '1:00 PM']},
  { day: 'Thursday', times: ['10:00 AM', '11:00 AM',  '12:00 PM', '1:00 PM']},
  { day: 'Friday', times: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM']},
  { day: 'Saturday', times: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM']}
];


  constructor() {}

 
}