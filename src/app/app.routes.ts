import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
//import { RegisterComponent } from './register/register.component';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';

export const routes: Routes = [

{ path: '', redirectTo: 'landing', pathMatch: 'full' },
{ path: 'landing', component: LandingComponent },
{path:'login',component:LoginComponent},
//{path:'register',component:RegisterComponent},
{path:'doctor',component:DoctorprofileComponent},



];
