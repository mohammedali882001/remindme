import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/NavBar/nav-bar/nav-bar.component';
import { FooterComponent } from './components/Footer/footer/footer.component';
import { CardComponent } from './components/Card/card/card.component';
import { RouterModule } from '@angular/router';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { DoctorDashboardComponent } from './pages/DoctorDashboard/doctor-dashboard/doctor-dashboard.component';
import { DonightChartComponent } from './components/DonughtChart/donight-chart/donight-chart.component';
//  import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,FooterComponent ,CardComponent,RouterModule,DoctorprofileComponent,DoctorDashboardComponent,DonightChartComponent],

templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'remindme';
}
