import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiService } from './../../../services/api.service';



@Component({
  selector: 'app-contact-us-mini',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsMiniComponent {
	theForm: FormGroup;
	disableBtn = false;

	constructor(private fb: FormBuilder, 
				private apiService: ApiService, 
				private toaster: ToastrService) 
	{
		this.theForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required]],
			subject: ['', [Validators.required]],
			message: ['', [Validators.required]],
		});
	}

	onSendMessage(): void {
		if (this.theForm.invalid) return;
		
		this.disableBtn = true;

		this.apiService.post('/users/sendEmail', this.theForm.value).subscribe({
			next: () => {
				this.disableBtn = false;
				this.theForm.reset();
				this.toaster.success('Email sent successfully, admin will contact you soon.');
			},
			error: () => {
				this.disableBtn = false;
				console.log('Error sending email');
			}
		})
	}

}
