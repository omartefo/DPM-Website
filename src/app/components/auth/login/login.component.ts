import { Router, ActivatedRoute } from '@angular/router';
import { GenericApiResponse, LoginAccountType } from './../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	theForm: FormGroup;
	disableLoginBtn = false;
	loginType: LoginAccountType = 'Client';

	constructor(private fb: FormBuilder, 
				private toaster: ToastrService,
				private authService: AuthService,
				private route: ActivatedRoute,
				private router: Router) 
	{
		this.theForm = fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});

		this.loginType = this.route.snapshot.params['type'];
	}

	onLogin(): void {
		this.disableLoginBtn = true;

		const payload = this.theForm.value;
		payload.type = this.loginType;

		this.authService.login(payload).subscribe({
			next: (resp: GenericApiResponse) => this.onLoginSuccess(resp),
			error: (error: any) => {
				this.disableLoginBtn = false;
				this.toaster.error(error);
			}
		});
	}

	onLoginSuccess(resp: GenericApiResponse): void {
		const token = resp.access_token;
		localStorage.setItem('token', token);
		this.authService.setUserInfo();

		if (this.loginType === 'Client') {
			this.router.navigateByUrl('/projects');
		}
		else {
			this.router.navigateByUrl('/tenders');
		}
	}
}
