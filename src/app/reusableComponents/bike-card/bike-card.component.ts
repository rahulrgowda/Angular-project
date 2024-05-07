import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bike-card',
  templateUrl: './bike-card.component.html',
  styleUrl: './bike-card.component.scss'
})
export class BikeCardComponent {


  @Input() bikeData: any;
  @Input() overlapData: any;
  @Output() outputData = new EventEmitter();

  onClick() {
    this.outputData.emit(this.bikeData);
  }

  checkOverlap(bike) {

    const overlap = this.overlapData ? this.overlapData.find(booking => {
      return bike._id === booking.bikeId
    }) : false;
    if (overlap) { return true }
    else { return false }
  }
}
