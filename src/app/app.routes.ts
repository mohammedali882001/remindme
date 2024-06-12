import { Routes } from '@angular/router';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { HomeComponent } from './pages/Home/home/home.component';


export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'profile/:id',component:DoctorprofileComponent}
];
