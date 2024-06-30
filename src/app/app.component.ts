import { StoryTestComponent } from './components/story-test/story-test.component';
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
import { SharedModule } from './models/shared-module';
import { EditDoctorProfileComponent } from './components/Edit-DoctorProfile/edit-doctor-profile/edit-doctor-profile.component';
import { QuestionsComponent } from './components/story-test/questions/questions.component';
import { FormsModule } from '@angular/forms';
import { ResultsTestComponent } from './components/story-test/results-test/results-test.component';
import { BoardComponent } from './Games/NoughtsAndCrosses/board/board.component';
import { DoctorFilterComponent } from "./components/doctor-filter/doctor-filter.component";
import { SliderComponent } from "./components/slider/slider.component";
import { BrowsDoctorCardComponent } from './components/brows-doctor-card/brows-doctor-card.component';
import { AppointmentTimesComponent } from './components/appointment-times/appointment-times.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [BoardComponent, RouterOutlet, NavBarComponent, FooterComponent, CardComponent, LandingComponent,
    DoctorSignUpComponent, RouterModule, DoctorprofileComponent, LoginComponent, RestPasswordComponent, RouterOutlet, SharedModule, EditDoctorProfileComponent, StoryTestComponent, QuestionsComponent, FormsModule, ResultsTestComponent, DoctorFilterComponent, SliderComponent, BrowsDoctorCardComponent, AppointmentTimesComponent]
})
export class AppComponent {
  title = "remindme";
}
