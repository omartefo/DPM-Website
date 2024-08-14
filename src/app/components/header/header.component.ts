import { UserInfo } from './../../models';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	user: UserInfo | null = null;
	showMobMenu = false;

	constructor(private authService: AuthService, private translateService: TranslateService) 
	{
		this.authService.userInfo.subscribe(userInfo => {
			this.user = userInfo;
		});
	}

	onLogout(): void {
		this.authService.logout();
	}

	toggleMenu(): void {
		this.showMobMenu = !this.showMobMenu;
	}

	changeLanguage(): void {
		this.translateService.setDefaultLang('en');
		this.translateService.use('en');
	}
}
