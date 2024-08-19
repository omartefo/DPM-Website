import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Validation from 'src/app/common/validators';
import { ApiService } from 'src/app/services/api.service';
import { GenericApiResponse, LoginAccountType } from './../../../models';
import { ToastrService } from 'ngx-toastr';
import Stepper from 'bs-stepper';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, AfterViewInit {
	@ViewChild('stepper') stepperElement!: ElementRef<HTMLElement>;

	accountType: LoginAccountType = 'Client';
	isMobileVerified = false;
	isOTPCodeReceived = false;
	theForm: FormGroup;
	disableGetOTPCodeBtn = false;
	disableVerifyOTPCodeBtn = false;
	disableSubmitBtn = false;
	message: string = '';
	private stepper!: Stepper;

	constructor(private route: ActivatedRoute,
				private fb: FormBuilder,
				private toaster: ToastrService,
				private apiService: ApiService) 
	{
		this.accountType = route.snapshot.params['type'] as LoginAccountType;

		this.theForm = fb.group({
			name: ['', [Validators.required]],
			mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			email: ['', [Validators.required]],
			password: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]],
			termsAndConditions: [false, [Validators.requiredTrue]]
		}, { validators: [Validation.match('password', 'confirmPassword')]});
	}

	ngOnInit(): void {
		if (this.accountType !== 'Client') {
			this.theForm.addControl('companyName', new FormControl('', Validators.required));
			this.theForm.addControl('commercialRegNumber', new FormControl('', Validators.required));
			this.theForm.addControl('address', new FormControl('', Validators.required));
			this.theForm.addControl('totalEmployees', new FormControl('', Validators.required));
			this.theForm.addControl('documents', new FormControl(''));
		}
	}

	ngAfterViewInit(): void {
		this.stepper = new Stepper(this.stepperElement.nativeElement, {
			linear: false,
			animation: true
		});
	}

	onNext(): void {
		this.stepper.next();
	}

	numericOnly(ev: any): boolean
    {
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
		if (allowedKeys.includes(ev.key)) return true;

        const letters = /^[0-9]+$/;
        if (ev.key && ev.key.match(letters))
        {
            return (ev.key.match(letters).length > 0);
        }

        return false;
    }

	onOTPVerification(): void {
		this.disableGetOTPCodeBtn = true;
		const payload = { mobileNumber: this.theForm.get('mobileNumber')?.value }

		this.apiService.post('/users/getOTPCode', payload).subscribe({
			next: () => {
				this.disableGetOTPCodeBtn = false;
				this.isOTPCodeReceived = true;
			},
			error: (errorMessage: string) => {
				this.disableGetOTPCodeBtn = false;
				this.toaster.error(errorMessage);
			}
		});
	}

	onVerify(code: string): void {
		this.disableVerifyOTPCodeBtn = true;
		const payload = { code, mobileNumber: this.theForm.get('mobileNumber')?.value };

		this.apiService.post('/users/verifyOTPCode', payload).subscribe({
			next: () => {
				this.isMobileVerified = true;
				this.disableVerifyOTPCodeBtn;
			},
			error: (errorMessage: string) => {
				this.disableVerifyOTPCodeBtn = false;
				this.toaster.error(errorMessage);
			}
		});
	}

	onSubmit(): void {
		if (!this.isMobileVerified) return;

		this.disableSubmitBtn = true;

		const payload = this.theForm.value;
		payload.type = this.accountType;
		payload.confirmPassword = undefined;
		payload.termsAndConditions = undefined;

		this.apiService.post('/users', payload).subscribe({
			next: (resp: GenericApiResponse) => {
				this.disableSubmitBtn = false;

				this.message = resp.message;
				this.isMobileVerified = false;
				this.theForm.reset();
			},
			error: (errorMessage: string) => {
				this.disableSubmitBtn = false;
				this.toaster.error(errorMessage);
			}
		})
	}
}
