import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        // check if role of path is admin
        if (route.data.roles=='Admin') {     
            if(this.authenticationService.adminValue!=null){
                // if not null there is a session, so send true
            return true;
            }
            else {
                // if null rediredct to login page to login first
            this.router.navigate(['/login']);
            return false;
            }
            }
            // check if role of path is customer
        if(route.data.roles=='User')  {
            if(this.authenticationService.customerValue!=null){
                // if not null there is session, so send true
                return true;
                }
                else {
                    // if null rediredct to login page to login first
                    this.router.navigate(['/login']);
                    return false;
                }
                }
          }
    }
