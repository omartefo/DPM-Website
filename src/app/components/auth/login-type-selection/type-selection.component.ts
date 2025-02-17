import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginType } from 'src/app/models';


@Component({
  selector: 'login-type-selection',
  templateUrl: './type-selection.component.html',
  styleUrls: ['./type-selection.component.scss']
})
export class LoginTypeSelectionComponent {
	loginTypes: LoginType[];
	
	constructor(private router: Router) 
	{
		this.loginTypes = [
			{
				type: 'Client',
				image: '/assets/images/client.png',
			},
			{
				type: 'Supplier',
				image: '/assets/images/supplier.png',
			},
			{
				type: 'Contractor',
				image: '/assets/images/supplier.png',
			},
			{
				type: 'Consultant',
				image: '/assets/images/consultant.png',
			},
		]
	}

	onLogin(type: LoginType): void {
		this.router.navigate(['login', type.type]);
	}

	onRegister(type: LoginType): void {
		this.router.navigate(['create-account', type.type]);
	}
}
