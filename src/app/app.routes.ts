import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { RelativeSignUpComponent } from './components/relative-sign-up/relative-sign-up.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';

export const routes: Routes = [

{ path: '', redirectTo: 'landing', pathMatch: 'full' },
{ path: 'landing', component: LandingComponent },
{path:'login',component:LoginComponent},
{path:'doctorProfile',component:DoctorprofileComponent},
{path:'registerDoctor',component:DoctorSignUpComponent},
{path:'registerRelative',component:RelativeSignUpComponent}

];
