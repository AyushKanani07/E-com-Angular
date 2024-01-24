import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from '../../../modules/services/seller-services/seller-login/seller.service';
import { UserLoginService } from '../../../modules/services/user-services/user-login/user-login.service';

export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem('seller')){
    return true;
  }
  else if(localStorage.getItem('user')){
    return true;
  }
  
  return inject(SellerService || UserLoginService).isSellerLoogedIn;

};
