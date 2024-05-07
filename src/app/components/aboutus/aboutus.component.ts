import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  constructor(private nav:NavbarService){
  }
  ngOnInit(){
    this.nav.show();
  }

}
