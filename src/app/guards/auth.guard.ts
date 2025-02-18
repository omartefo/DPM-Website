import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
	constructor(private authService: AuthService, private router: Router) 
	{ }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
	{
		const user = this.authService.userInfo.value;

		if (user) {
			if (route.data['userTypes'] && route.data['userTypes'].indexOf(user.type) === -1) {
				return false
			}

			return true;
		}
		
        this.router.navigateByUrl('/login-type');
        return false;
	}
}
