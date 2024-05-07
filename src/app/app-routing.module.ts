import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component'; 
import { adminGuard } from './services/adminGuard/admin.guard';
import { userGuard } from './services/userGuard/user.guard';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'search/:locationId',component:SearchComponent,canActivate:[userGuard]
  },
  {
    path:'contactus', component:ContactusComponent,canActivate:[userGuard]
  },
  {
    path:'aboutus', component:AboutusComponent,canActivate:[userGuard]
  },
  {
    path:'bookings',component:BookingsComponent,canActivate:[userGuard]
  },
  {
    path:'manage/:locationId',component:ManageComponent,canActivate:[adminGuard]
  },
  {
    path:'allBookings',component:AllBookingsComponent,canActivate:[adminGuard]
  },
  {
    path:'feedbacks',component:FeedbacksComponent,canActivate:[adminGuard]
  },
  {
    path:'**',component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
