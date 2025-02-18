import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericApiResponse } from './../../../models';
import { ApiService } from './../../../services/api.service';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent {
	email = new FormControl('', [Validators.required, Validators.email]);
	disableBtn = false;
	message: string = '';

	constructor(private apiService: ApiService, private toaster: ToastrService) 
	{ }

	onForgotPassword(): void {
		this.disableBtn = true;

		this.apiService.post('/auth/forgotPassword', { email: this.email.value }).subscribe({
			next: (resp: GenericApiResponse) => {
				this.disableBtn = false;
				this.message = resp.message;
			},
			error: (error: any) => this.toaster.error(error)
		})
	}
}
