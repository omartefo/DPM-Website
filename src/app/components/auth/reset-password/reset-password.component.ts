import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GenericApiResponse } from './../../../models';
import Validation from 'src/app/common/validators';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
	resetToken: string;
	theForm: FormGroup;
	disableBtn = false;

	constructor(private route: ActivatedRoute,
				private toaster: ToastrService,
				private router: Router,
				private fb: FormBuilder,
				private apiService: ApiService) 
	{
		this.resetToken = this.route.snapshot.params["token"];
		this.theForm = fb.group({
			password: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]],
		}, { validators: [Validation.match('password', 'confirmPassword')]});
	}

	onResetPassword(): void {
		this.disableBtn = true;
		const payload = this.theForm.value;
		payload.confirmPassword = undefined;

		this.apiService.patch(`/auth/resetPassword/${this.resetToken}`, payload).subscribe({
			next: (resp: GenericApiResponse) => {
				this.toaster.success(resp.message);
				this.router.navigateByUrl('/login-type');
				this.disableBtn = false;
			},
			error: (error: any) => {
				this.toaster.success(error);
				this.disableBtn = false;
			}
		});
	}
}
