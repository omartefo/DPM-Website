import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/services/api.service';
import { Bid, Tender } from './../../../models';
import { GenericApiResponse } from 'src/app/models';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
	tenderId!: number;
	tender!: Tender;
	bids: Bid[] = [];

	constructor(private route: ActivatedRoute,
				private toaster: ToastrService,
				private apiService: ApiService) 
	{ }

	ngOnInit(): void {
		this.tenderId = +this.route.snapshot.params['tenderId'];

		if (this.tenderId) {
			this.getTenderDetails();
			this.getAllBids();
		}
	}

	getTenderDetails(): void {
		this.apiService.get(`/tenders/${this.tenderId}`).subscribe({
			next: (resp: GenericApiResponse) => this.tender = resp.data.tender,
			error: (error: any) => this.toaster.error(error)
		});
	}

	getAllBids(): void {
		this.apiService.get(`/tenders/${this.tenderId}/bids`).subscribe({
			next: (resp: GenericApiResponse) => this.bids = resp.data.bids,
			error: (error: any) => this.toaster.error(error)
		});
	}
}
