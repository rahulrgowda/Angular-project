import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navService/navbar.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private nav: NavbarService, private router:Router){}

  ngOnInit(){
    this.nav.hide()
  }
  redirect(){
    this.router.navigate(['/'])
  }
}
