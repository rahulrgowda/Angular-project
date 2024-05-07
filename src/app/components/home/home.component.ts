import { Component } from '@angular/core';  
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  locations:any[]=[];
  fromLocation:string="";
  
  constructor( private bikeSrv: BikeService , private router:Router, private auth:AuthService, private nav:NavbarService){
    this.getAllLocations();
}

ngOnInit(){
  this.nav.show();
}
  
  getAllLocations(){
    this.bikeSrv.getAllLocations().subscribe((res:any)=>{
      this.locations=res;
    })
  }

  navigateToSearchPage(){
  if(this.auth.user?this.auth.user.admin:false){
    this.router.navigate(['/manage',this.fromLocation])
  }
  else{
    this.router.navigate(['/search',this.fromLocation])
  }
    
  }
}
