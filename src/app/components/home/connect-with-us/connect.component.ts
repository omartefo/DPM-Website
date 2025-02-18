import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
    selector: 'app-connect-with-us',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.scss'],
    standalone: false
})
export class ConnectWithUsComponent {
	email = new FormControl('');

	constructor() { }

	onSignUp(): void {
		if (this.email.value) {
			console.log('Email', this.email.value);
		}
	}
}
