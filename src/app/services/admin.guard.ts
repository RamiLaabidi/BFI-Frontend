import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
   const router = inject(Router)
   if (auth.isLoggedIn() && auth.currentUser()?.role === 'ADMIN' ) {
     return true ;
   }
   else {
     router.navigate(['/login']);
     return false ;
   }
  };

