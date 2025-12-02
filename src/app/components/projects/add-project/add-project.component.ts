import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.scss'],
    standalone: false
})
export class AddProjectComponent {
	theForm: FormGroup;
	projectTypes: string[] = ['Villa', 'Commercial Building', 'Industrial Project'];
	modalRef!: BsModalRef;

	constructor(private fb: FormBuilder,
				private authService: AuthService,
				private toaster: ToastrService,
				private apiService: ApiService) 
	{
		this.theForm = fb.group({
			name: ['', Validators.required],
			location: ['', Validators.required],
			type: ['', Validators.required],
			description: ['', Validators.required],
		});
	}

	onSubmit(): void {
		const payload = this.theForm.value;
		payload.clientId = this.authService.userInfo.value?.userId;

		this.apiService.post('/projects', payload).subscribe(
		{
			next: () => {
				this.modalRef.hide();
				this.toaster.success('Project created successfully, waiting for admin approval', '', {
					disableTimeOut: true 
				});
			},
			error: (error: any) => console.log(error)
		});
	}

	onClose() {
		this.modalRef.hide();
	}
}
