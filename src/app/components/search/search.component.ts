import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  constructor(private bikeSrv: BikeService, private auth: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService, private nav: NavbarService) {

    this.activatedRoute.params.subscribe((res) => {
      console.log(res )
      this.locationId = res.locationId;
    })
  }

  ngOnInit(): void {
    this.nav.show();
    this.getAllBikes();
    this.getAllLocations();

  }

  ourBikes: any[] = [];
  locationId: string;
  locations: any[] = [];
  overlapBooking: any[];

  get loggedUserObj() {
    return this.auth.user;
  }

  durationSaved: boolean = false;
  durationHours: number;

  bookingDuration: any = {
    "startDateTime": "",
    "endDateTime": ""
  }

  totalCost: number;

  bookingDetails: any = {
    "userName": "",
    "userEmailId": "",
    "userMobileNo": "",
    "bikeId": "",
    "bikeBooked": "",
    "pickUpLocaationId": "",
    "pickUpLocation": "",
    "pickUpDate": "",
    "dropOffDate": "",
    "rideDuration": "",
    "totalRideCost": "",
    "bikePicUrl": ""
  };


  getAllLocations() {
    this.bikeSrv.getAllLocations().subscribe((res: any) => {
      this.locations = res;
    });

  }

  getAllBikes() {
    this.bikeSrv.getAllBikes().subscribe((res: any) => {
      this.ourBikes = res.filter((bike) => {
        return bike.locationId == this.locationId
      });
    })
  }


  saveDuration() {

    console.log(this.bookingDuration)

    if (this.bookingDuration.startDateTime !== "" && this.bookingDuration.endDateTime !== "") {

      const today = new Date();
      const start = new Date(this.bookingDuration.startDateTime)
      const end = new Date(this.bookingDuration.endDateTime)

      if (start >= today && end > start) {
        const timeDifferenceMs = end.getTime() - start.getTime();
        this.durationHours = parseFloat((timeDifferenceMs / (1000 * 60 * 60)).toFixed(1));
        console.log(this.durationHours)

        if (this.durationHours >= 2) {
          this.durationSaved = true;

          this.checkOverlap();
          this.toastr.success("Booking Duration Saved");
        } else {
          this.durationSaved=false;
          this.toastr.warning("Minimum duration should be 2 Hours")
        }

      } else {
        this.toastr.warning("Date/Time is not correct")
      }

    } else {
      this.toastr.error("Details not filled")
    }

  }


  makeBooking(bike: any) {
    if (this.loggedUserObj != null) {

      console.log("working")

      if (this.durationSaved) {
        this.bookingDetails = this.getBookingDetails(bike);
        this.showBookingDetails();
      } else {
        this.toastr.warning("Details not filled")
      }
    }

    else if (this.loggedUserObj == null) {
      this.toastr.error("Please Login to Proceed")
    }
  }


  getBookingDetails(bike) {
    this.totalCost = Math.round(parseInt(bike.price) * this.durationHours);

    const bookingSummary: any = {
      "userName": this.loggedUserObj.name,
      "userEmailId": this.loggedUserObj.emailId,
      "userMobileNo": this.loggedUserObj.mobileNO,
      "bikeId": bike._id,
      "bikeBooked": bike.brand + ' ' + bike.name,
      "pickUpLocationId": bike.locationId,
      "pickUpLocation": bike.locationTitle,
      "pickUpDate": this.bookingDuration.startDateTime,
      "dropOffDate": this.bookingDuration.endDateTime,
      "rideDuration": this.durationHours,
      "totalRideCost": this.totalCost,
      "bikePicUrl": bike.imageUrl
    }
    return bookingSummary;
  }

  showBookingDetails() {
    const modal = document.getElementById("bookingModal");
    if (modal != null) {
      modal.style.display = "block";
    }
  }
  closeBookingDetails() {
    const modal = document.getElementById("bookingModal");
    if (modal != null) {
      modal.style.display = "none";
    }
  }


  paymentDone() {
    this.bikeSrv.sendBookingDetails(this.bookingDetails).subscribe((res) => {
      this.toastr.success("Payment Done Successfully")
      this.closeBookingDetails();
      this.router.navigate(['bookings'])
    })
  }

  async checkOverlap() {
    const newStart = new Date(this.bookingDuration.startDateTime)
    const newEnd = new Date(this.bookingDuration.endDateTime)

    await this.bikeSrv.getAllBookings().subscribe((res: any) => {
      this.overlapBooking = res.filter((booking) => {
        const start = new Date(booking.pickUpDate);
        const end = new Date(booking.dropOffDate);
        
        return !((newStart >= end && newEnd >= end) || (newStart <= start && newEnd <= start))
      })
    })
  }

}
