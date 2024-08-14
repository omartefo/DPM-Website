import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { GenericApiResponse, Tender } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tenders-table',
  templateUrl: './tenders-table.component.html',
  styleUrls: ['./tenders-table.component.scss']
})
export class TendersTableComponent implements OnInit {
	tenders: Tender[] = [];

	constructor(private apiService: ApiService, private toaster: ToastrService) 
	{ }

	ngOnInit(): void {
		this.getTenders();
	}

	getTenders(): void {
		this.apiService.get('/bids/getBidsByUser').subscribe({
			next: (resp: GenericApiResponse) => this.tenders = resp.data.bids.rows.map((rec: any) => rec.tender),
			error: (error: any) => this.toaster.error(error)
		});
	}
}
