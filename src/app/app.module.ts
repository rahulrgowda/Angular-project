import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BikeCardComponent } from './reusableComponents/bike-card/bike-card.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ManageComponent } from './components/manage/manage.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import {ToastNoAnimationModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    BikeCardComponent,
    ContactusComponent,
    AboutusComponent,
    BookingsComponent,
    ManageComponent,
    AllBookingsComponent,
    FeedbacksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    ToastNoAnimationModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates:true,
    }),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
