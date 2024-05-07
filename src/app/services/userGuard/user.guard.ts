import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const auth= new AuthService();
  const router=new Router()
  
  //user guard
  if(auth.user?auth.user.admin:false){
    return router.navigate(['home']);
  }else{    
    return true ;
  }
};
