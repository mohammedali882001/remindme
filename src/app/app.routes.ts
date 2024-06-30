import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { RelativeSignUpComponent } from './components/relative-sign-up/relative-sign-up.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';
import { PatientProfileComponent } from './pages/PatientProfile/patientprofile/patient-profile/patient-profile.component';


// import { HomeComponent } from './pages/Home/home.component';
import { StickyNotesComponent } from './components/sticky-notes/sticky-notes.component';
import { PatientVisitedProfileComponent } from './pages/PatientVisitedProfile/patient-visited-profile/patient-visited-profile.component';


import { AllStoriesComponent } from './components/story-test/StoriesTest/all-stories/all-stories.component';
import { ResultsTestComponent } from './components/story-test/results-test/results-test.component';
import { QuestionsComponent } from './components/story-test/questions/questions.component';
import { DoctorDashboardComponent } from './pages/DoctorDashboard/doctor-dashboard/doctor-dashboard.component';
import { SliderComponent } from './components/slider/slider.component';

import { PatientsRequestsComponent } from './pages/DoctorDashboard/patients-requests/patients-requests.component';
import { AppointmentsRequestsComponent } from './pages/DoctorDashboard/appointments-requests/appointments-requests.component';
import { GameComponent } from './Games/Hangman/game/game.component';
import { GameBoardComponent } from './Games/MemoryCards/game-board/game-board.component';
import { BoardComponent } from './Games/NoughtsAndCrosses/board/board.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { BrowseDoctorsComponent } from './pages/Home/browse-doctors/browse-doctors.component';
import { DoctorVisitedProfileComponent } from './pages/doctor-visited-profile/doctor-visited-profile.component';
//import { HomeComponent } from './pages/Home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
   { path: 'browseDoctors', component: BrowseDoctorsComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctorProfile', component: DoctorprofileComponent },
  { path: 'patientProfile', component: PatientProfileComponent },
  { path: 'registerDoctor', component: DoctorSignUpComponent },
  { path: 'registerRelative', component: RelativeSignUpComponent },
  {path:'notes',component:StickyNotesComponent},
  {path:'hangman',component:GameComponent},
  { path: 'memorycards', component: GameBoardComponent },
  { path: 'xo', component: BoardComponent },
  { path: 'VisitedPatientprofile/:id', component: PatientVisitedProfileComponent },
  { path: 'VisitedDoctorprofile/:id', component: DoctorVisitedProfileComponent },
  { path: 'results-test', component: ResultsTestComponent },
  //{ path: 'story-test', component: StoryTestComponent },
  { path: 'AllStories', component: AllStoriesComponent },
  { path: 'story-test', component: StoryTestComponent },


  { path: 'Question', component: QuestionsComponent },

  //Doctor dashboard
  { path: 'DoctorDashboard', component: DoctorDashboardComponent, children : [
    { path: 'PatientsRequests', component: PatientsRequestsComponent },
    { path: 'AppointmentsRequests', component: AppointmentsRequestsComponent },
  ] },

  { path: 'slider', component: SliderComponent },

  { path: 'Question/:storyTestId', component: QuestionsComponent },


];
