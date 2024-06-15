import { LoginComponent } from './components/login/login.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/NavBar/nav-bar/nav-bar.component';
import { FooterComponent } from './components/Footer/footer/footer.component';
import { CardComponent } from './components/Card/card/card.component';
import { RouterModule } from '@angular/router';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';

import { LandingComponent } from './components/landing/landing.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';
import { RestPasswordComponent } from './components/rest-password/rest-password.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,NavBarComponent,FooterComponent ,CardComponent, LandingComponent,
    DoctorSignUpComponent,RouterModule,DoctorprofileComponent,LoginComponent,RestPasswordComponent],



templateUrl: './app.component.html',


  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'remindme';
}
