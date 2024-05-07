import { Component } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent {
  constructor(private bikeSrv:BikeService, private nav:NavbarService){
  }
  ngOnInit(){
    this.nav.show();
    this.getAllFeedbacks();
  }
  allFeedbacks:any[];

  getAllFeedbacks(){

    this.bikeSrv.getAllFeedbacks().subscribe((res:any)=>{
      this.allFeedbacks=res; 
      console.log(this.allFeedbacks)
    })
  }

  deleteFeedback(feedback:any){
    this.bikeSrv.deleteFeedback(feedback._id).subscribe((res:any)=>{
      this.getAllFeedbacks();
    })
  }
}
