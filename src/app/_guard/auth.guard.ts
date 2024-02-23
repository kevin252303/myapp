import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const accountservice = inject(AccountService);
  const toster = inject(ToastrService);
  
  return accountservice.currentUser$.pipe(
    map(user =>{
      if (user) return true;
      else{
        toster.error('you shall not pass');
        return false;
      }
    })
  )
};
