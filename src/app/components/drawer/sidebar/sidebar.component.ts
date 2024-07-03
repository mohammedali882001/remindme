import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentTimesComponent } from "../../appointment-times/appointment-times.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    imports: [RouterLink, AppointmentTimesComponent]
})
export class SidebarComponent {
  isActive = true;

  toggleSideitembar() {
    this.isActive = !this.isActive;
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }
  }
}
