import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GenericApiResponse } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { Bid, Tender } from './../../../models';


@Component({
	selector: 'app-pricing',
	templateUrl: './pricing.component.html',
	styleUrls: ['./pricing.component.scss'],
	standalone: false,
})
export class PricingComponent implements OnInit {
	tenderId!: number;
	tender!: Tender;
	bids: Bid[] = [];

	page = 1;
	limit = 50;
	pageSizeOptions = [5, 10, 20, 25, 50];
	totalCount = 0;

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
		const slug = `/tenders/${this.tenderId}/bids?page=${this.page}&limit=${this.limit}`;

		this.apiService.get(slug).subscribe({
			next: (resp: GenericApiResponse) => {
				const { rows, count } = resp.data.bids;
				this.bids = rows.map((row: Bid) => ({
					...row,
					status: row.status.replace(/_/g, ' ')
				}));
				this.totalCount = count;
			},
			error: (error: any) => this.toaster.error(error)
		});
	}

	get totalPages(): number {
		return this.totalCount ? Math.ceil(this.totalCount / this.limit) : 1;
	}

	get showingFrom(): number {
		if (!this.totalCount) return 0;
		return (this.page - 1) * this.limit + 1;
	}

	get showingTo(): number {
		return Math.min(this.page * this.limit, this.totalCount);
	}

	goToPage(page: number): void {
		if (page < 1 || page > this.totalPages || page === this.page) return;
		this.page = page;
		this.getAllBids();
	}

	changePageSize(limit: number): void {
		this.limit = +limit;
		this.page = 1;
		this.getAllBids();
	}

	getStatusClass(status: string): any {
    const normalized = status.toLowerCase().replace(/ /g, '_');

    return {
      in_range: 'badge-in-range',
      out_of_range: 'badge-out-range'
    }[normalized] || 'badge-default';
}
}
