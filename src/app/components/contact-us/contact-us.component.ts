import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserConfig } from 'src/app/common/constants/constants';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    standalone: false
})
export class ContactUsComponent {
	theForm: FormGroup;
	message: string = '';
	disableBtn = false;
	contactNumber = UserConfig.contactNumber;
	contactEmail = UserConfig.contactEmail;
	contactAddress = UserConfig.contactAddress;

	constructor(private fb: FormBuilder, 
				private apiService: ApiService, 
				private toaster: ToastrService) 
	{
		this.theForm = fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phoneNumber: ['', Validators.required],
			subject: ['', Validators.required],
			message: ['', Validators.required],
		});
	}

	numericOnly(ev: KeyboardEvent): boolean {
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
		if (allowedKeys.includes(ev.key)) {
			return true;
		}
	
		const letters = /^[0-9]+$/;
		const match = ev.key?.match(letters);
		if (match) {
			return match.length > 0;
		}
	
		return false;
	}

	onSendMessage(): void {
		if (this.theForm.invalid) return;
		
		this.disableBtn = true;

		this.apiService.post('/users/sendEmail', this.theForm.value).subscribe({
			next: () => {
				this.disableBtn = false;
				this.theForm.reset();
				this.message = 'Email sent successfully, admin will contact you soon.';
				this.scrollToTop();
			},
			error: (error: any) => {
				this.disableBtn = false;
				this.toaster.error(error);
			}
		})
	}

	scrollToTop(): void {
		window.scroll({ 
			top: 0, 
			left: 0, 
			behavior: 'smooth' 
		});
	}
}
