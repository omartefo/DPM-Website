import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
	theForm: FormGroup;
	message: string = '';
	disableBtn = false;

	constructor(private fb: FormBuilder, private apiService: ApiService) 
	{
		this.theForm = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			subject: ['', Validators.required],
			message: ['', Validators.required],
		});
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
			error: () => {
				this.disableBtn = false;
				console.log('Error sending email');
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
