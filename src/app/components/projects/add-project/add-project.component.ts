import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GenericApiResponse } from './../../../models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
	theForm: FormGroup;
	projectTypes: string[] = ['Villa', 'Commercial Building', 'Industrial Project'];
	projectLocations: string[] = ['Doha', 'Al Rayyan', 'Umm Salal', 'Al Khor & Al Thakira', 'Al Wakrah', 'Al Daayen', 'Al Shamal, and Al Shahaniya'];
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
