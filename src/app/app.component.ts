import { StoryTestComponent } from './components/story-test/story-test.component';
import { LoginComponent } from './components/login/login.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';
import { RestPasswordComponent } from './components/rest-password/rest-password.component';
import { QuestionsComponent } from './components/story-test/questions/questions.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent,
    DoctorSignUpComponent,LoginComponent,RestPasswordComponent,StoryTestComponent,QuestionsComponent,FormsModule 
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'remindme';
}
