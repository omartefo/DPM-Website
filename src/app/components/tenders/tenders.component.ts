import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subscription, timer } from 'rxjs';

import { GenericApiResponse, Tender } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-tenders',
    templateUrl: './tenders.component.html',
    styleUrls: ['./tenders.component.scss'],
    standalone: false
})
export class TendersComponent implements OnInit, OnDestroy {
	tenders: Tender[] = [];
	subscriptions: Subscription[] = [];
	searchFC = new FormControl();

	page = 1;
	limit = 10;
	totalRecords = 0;

	constructor(private apiService: ApiService,
				private router: Router,
				private toaster: ToastrService) 
	{
		this.searchFC.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
			.subscribe(search => {
				this.getTenders(search);
			});
	}

	ngOnInit(): void {
		this.getTenders();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subs => subs.unsubscribe());
	}

	getTenders(search: string | null = null): void {
		let slug = `/tenders?page=${this.page}&limit=${this.limit}`;
		slug += search ? `&tenderNumber=${search}` : '';

		this.apiService.get(slug).subscribe({
			next: (resp: GenericApiResponse) => {
				this.tenders = resp.data.tenders;
				this.totalRecords = resp.totalRecords;

				for (let tender of this.tenders) 
				{
					const t = timer(0, 1000);
					const subs: Subscription = t.subscribe(() => this.setRemainingTime(tender, subs));
					this.subscriptions.push(subs);
				}
			},
			error: (error: any) => this.toaster.error(error)
		});
	}

	setRemainingTime(tender: Tender, subs: Subscription) {
		const currentTime = new Date().getTime();

		// Case: If tender closing time passed away (Tender Finished)
		if ((new Date(tender.closingDate).getTime() - currentTime) < 0) {
			tender.remainingTime = 0;
			subs.unsubscribe();
			return;
		}
		
		const lastTenMinutes = moment(tender.closingDate).subtract(10, 'minutes');

		// Case: If Current time is in between Opening and Closing time of tender
		if (new Date(tender.openingDate).getTime() < currentTime) {
			// Check if tender is in last 10 minutes
			if (!moment(lastTenMinutes).isSameOrAfter(currentTime)) 
			{
				tender.canBid = true;
			}

			const diff = new Date(tender.closingDate).getTime() - currentTime;
			tender.days = Math.floor(diff / (60 * 60 * 24 * 1000));
			tender.hours = Math.floor(diff / (60 * 60 * 1000)) - (tender.days * 24);
			tender.minutes = Math.floor(diff / (60 * 1000)) - ((tender.days * 24 * 60) + (tender.hours * 60));
			tender.seconds = Math.floor(diff / 1000) - ((tender.days * 24 * 60 * 60) + (tender.hours * 60 * 60) + (tender.minutes * 60));
	
			tender.remainingTime = `${tender.days} days, ${tender.hours} hours, ${tender.minutes} minutes, ${tender.seconds} seconds`;
		}
		else {
			// Case: If Opening time of tender is ahead of current time
			tender.remainingTime = -1;
		}
	}

	onViewTenderDetails(tender: Tender): void {
		this.router.navigateByUrl(`detail/${tender.tenderId}`);
	}

	onPageChange(page: number): void {
		this.page = page;
		this.getTenders();
	}
}
