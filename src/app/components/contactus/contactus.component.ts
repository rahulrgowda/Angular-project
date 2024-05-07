import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  
  constructor(private fb:FormBuilder,private router:Router,private bikeSrv: BikeService, private toastr: ToastrService, private nav :NavbarService){
     
  }
  ngOnInit(){
    this.nav.show()
  }

  feedbackDetails=this.fb.group({
    name:['',[Validators.required]],
    emailId:['',[Validators.required,Validators.email]],
    message:['',[Validators.required]]
  })

  
  submitContactUs(){
    this.toastr.success(`Message Submitted Successfully`);
    const feedback= this.feedbackDetails.value;
    this.bikeSrv.sendFeedback(feedback).subscribe((res:any)=>{
    })
    this.feedbackDetails.reset();
  }

}
