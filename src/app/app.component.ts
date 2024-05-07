import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { BikeService } from './services/bike.service';
import { NavbarService } from './services/navService/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private bikeSrv: BikeService, private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService, public nav: NavbarService) {
  }


  title = 'bike_rental_app';

  get loggedUserObj() {
    return this.auth.user;
  }

  registerObj = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-z\s]*$/)]],
    emailId: ['', [Validators.required, Validators.email]],
    mobileNo: [''],
    password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*[A-Z]).{6,}/)]]
  })

  postRegisterObj: any;

  loginObj: any = {
    "emailId": "",
    "password": ""
  }


  // Registration

  onRegister() {

    this.postRegisterObj = this.registerObj.value;
    this.bikeSrv.getUser(this.postRegisterObj).subscribe((res: any) => {

      if (res.status === 'User doesnot exist') {
        console.log('working')
        this.bikeSrv.registerUser(this.postRegisterObj).subscribe((res: any) => {
          this.registerReset();
          this.closeRegister();
          this.openLogin();
        })
      }
      else {
        this.toastr.error('user already exists');
      }
    })
  }

  registerReset() {
    this.registerObj.reset();
  }

  //Login
  onLogin() {
    this.bikeSrv.getUser(this.loginObj).subscribe((res: any) =>{
      const user=res;
      if (res.status === 'User doesnot exist') {
        this.toastr.error(res.status)
        }
      else if(res.status === 'Password incorrect'){
        this.toastr.error(res.status);
      }
      else{
        if(user.emailId===this.auth.admin){
                user.admin=true;
              }
              else{
                user.admin=false;
              }
              this.auth.setUser(user)
              this.closeLogin();
              if(this.auth.user.admin){
                this.router.navigate(['/home'])
              }
      }
    
    })
    // this.bikeSrv.getRegister(this.loginObj).subscribe((res:any)=>{
    //   const user = res.find((a:any)=>{
    //     return a.emailId===this.loginObj.emailId && a.password ===this.loginObj.password ;
    //   })
    //   if (user){
    //     if(user.emailId===this.auth.admin){
    //       user.admin=true;
    //     }
    //     else{
    //       user.admin=false;
    //     }
    //     this.auth.setUser(user)
    //     this.closeLogin();
    //     if(this.auth.user.admin){
    //       this.router.navigate(['/home'])
    //     }
    //   }
    //   else{
    //     this.toastr.error("Password doesn't match or User not Found. Please Register")
    //     this.closeLogin();
    //    }
    //   this.loginReset();
    // })
  }

  loginReset() {
    this.loginObj = {
      "emailId": "",
      "password": ""
    }
  }

  logOff() {
    this.auth.removeUser();
    this.router.navigate(['home'])
    this.postRegisterObj = null;
  }

  redirectToBookings() {
    this.router.navigate(['bookings'])
  }

  // Register Popup
  openRegister() {
    this.closeLogin()
    const modal = document.getElementById('registerModal');
    if (modal != null) {
      modal.style.display = 'block';
    }

  }

  closeRegister() {
    const modal = document.getElementById('registerModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
    this.registerReset()
  }


  // Login popup

  openLogin() {
    this.closeRegister()
    const modal = document.getElementById('loginModal');
    if (modal != null) {
      modal.style.display = 'block';
    }

  }

  closeLogin() {
    const modal = document.getElementById('loginModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
    this.loginReset()
  }
}
