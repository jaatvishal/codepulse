import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode'; 
import { inject } from '@angular/core';
 
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService=inject(CookieService);
  const authService=inject(AuthService);
  const router =inject(Router);
  const user= authService.getUser();
  //check for the JWT token 
  let token = cookieService.get('Authorization');
  if(token)
    {
      token=token.replace('Bearer ',''); 
      const decodedToken: any  = jwtDecode(token) ;
      // check if the token has expired 
       const expirationDate=decodedToken.exp * 1000; // convert to milliseconds
       const currentDate = new Date().getTime();
        if (currentDate > expirationDate) {
          //Logout 
          authService.logout();
          return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url} });   
        } else{
          //Token is still valid 
          if(user?.roles.includes('Writer'))
         {
            //if the user is a writer, allow access to the route
            return true;
          }
          else{
            alert('Unauthorized access');
            return false; // or redirect to an unauthorized page
          }
        }
      //remove the Bearer part
   //token=jwtDecode(token); 
  }
  else{
   authService.logout();
   return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url} }); 
}
}
