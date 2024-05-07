import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {

constructor(private bikeSrv:BikeService, private auth: AuthService, private router :Router, private nav :NavbarService){
}

userBookings:any[];

ngOnInit(){
  //if no one is logged in user is null and redirects to home
  this.nav.show()
  if (!(this.auth.user)) {
    this.router.navigate(['/home']);
    }
  this.getAllBookings()
    
}

getAllBookings(){
  this.bikeSrv.getAllBookings().subscribe((res:any)=>{
    this.userBookings=res.filter(booking=>{
      return booking.userEmailId===this.auth.user.emailId;
    })
    this.userBookings.reverse();
  })
}
}
