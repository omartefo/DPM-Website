import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-bidding-form',
  templateUrl: './bidding-form.component.html',
  styleUrls: ['./bidding-form.component.scss']
})
export class BiddingFormComponent {
	theForm: FormGroup;
	biddingId!: number;
	tenderId!: number;
	message: string = '';
	disableSubmitBtn = false;

	constructor(private fb: FormBuilder,
				private toaster: ToastrService,
				private route: ActivatedRoute,
				private apiService: ApiService, 
				private authService: AuthService) 
	{
		this.theForm = fb.group({
			durationInLetters: ['', [Validators.required]],
			durationInNumbers: ['', [Validators.required]],
			priceInLetters: ['', [Validators.required]],
			priceInNumbers: ['', [Validators.required]],
		});

		this.biddingId = +route.snapshot.params['biddingId'];
		this.tenderId = +route.snapshot.params['tenderId'];
	}

	onPlaceBid(): void {
		this.disableSubmitBtn = true;
		const payload = this.theForm.value;

		if (this.biddingId) {
			this.apiService.patch(`/bids/${this.biddingId}`, payload).subscribe({
				next: () => {
					this.disableSubmitBtn = false;
					this.message = 'Thank you, your bid has been submitted.';
				},
				error: (error) => {
					this.disableSubmitBtn = false;
					this.toaster.error(error);
				}
			});
		}
		else {
			payload.tenderId = this.tenderId;
			payload.userId = this.authService.userInfo.value?.userId;
			
			this.apiService.post('/bids', payload).subscribe({
				next: () => {
					this.disableSubmitBtn = false;
					this.message = 'Thank you, your bid has been submitted.';
				},
				error: (error) => {
					this.disableSubmitBtn = false;
					this.toaster.error(error);
				}
			});
		}
	}
}
