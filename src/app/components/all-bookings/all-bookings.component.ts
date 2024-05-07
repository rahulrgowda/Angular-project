import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {

  constructor(private router: Router, private bikeSrv: BikeService, private nav: NavbarService) { }


  ngOnInit() {
    this.getAllBookings()
    this.nav.show();
  }

  bookings: any[];


  getAllBookings() {
    this.bikeSrv.getAllBookings().subscribe((res: any) => {
      this.bookings = res;
      this.bookings.reverse()
    });
  }


}

