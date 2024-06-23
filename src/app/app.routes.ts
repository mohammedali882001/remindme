import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { RelativeSignUpComponent } from './components/relative-sign-up/relative-sign-up.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';
import { PatientProfileComponent } from './pages/PatientProfile/patientprofile/patient-profile/patient-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { AllStoriesComponent } from './components/story-test/StoriesTest/all-stories/all-stories.component';
import { ResultsTestComponent } from './components/story-test/results-test/results-test.component';
import { QuestionsComponent } from './components/story-test/questions/questions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctorProfile', component: DoctorprofileComponent },
  { path: 'patientProfile', component: PatientProfileComponent },
  { path: 'registerDoctor', component: DoctorSignUpComponent },
  { path: 'registerRelative', component: RelativeSignUpComponent },
  ////////////////////
  { path: 'results-test', component: ResultsTestComponent },
  { path: 'story-test', component: StoryTestComponent },
  { path: 'AllStories', component: AllStoriesComponent },
  { path: 'Question', component: QuestionsComponent },
];
