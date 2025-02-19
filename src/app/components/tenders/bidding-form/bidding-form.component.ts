import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-bidding-form',
    templateUrl: './bidding-form.component.html',
    styleUrls: ['./bidding-form.component.scss'],
    standalone: false
})
export class BiddingFormComponent {
	theForm: FormGroup;
	biddingId!: number;
	tenderId!: number;
	message: string = '';
	disableSubmitBtn = false;

	constructor(fb: FormBuilder,
				route: ActivatedRoute,
				private toaster: ToastrService,
				private apiService: ApiService) 
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
					this.message = 'شكرًا لك على تقديم عرضك. لقد تم استلام عرض السعر بنجاح وسيتم مراجعته في أقرب وقت ممكن.';
				},
				error: (error) => {
					this.disableSubmitBtn = false;
					this.toaster.error(error);
				}
			});
		}
		else {
			payload.tenderId = this.tenderId;
			
			this.apiService.post('/bids', payload).subscribe({
				next: () => {
					this.disableSubmitBtn = false;
					this.message = 'شكرًا لك على تقديم عرضك. لقد تم استلام عرض السعر بنجاح وسيتم مراجعته في أقرب وقت ممكن.';
				},
				error: (error) => {
					this.disableSubmitBtn = false;
					this.toaster.error(error);
				}
			});
		}
	}
}
