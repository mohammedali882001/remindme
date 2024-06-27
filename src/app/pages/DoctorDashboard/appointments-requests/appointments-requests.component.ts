import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appointments-requests',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './appointments-requests.component.html',
  styleUrl: './appointments-requests.component.css'
})
export class AppointmentsRequestsComponent {

}
