import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = new AuthService();
  const router = new Router();
  
  //guard for admin
  if(auth.user?auth.user.admin:false){
    return true;
  }else{    
    return router.navigate(['home']);
  }
};
