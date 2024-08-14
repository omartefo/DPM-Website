import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
	confirmationCode: string;
	isVerified = false;

	constructor(private route: ActivatedRoute, 
				private apiService: ApiService) 
	{
		this.confirmationCode = this.route.snapshot.params["confirmationCode"];
	}

	ngOnInit(): void {
		this.verifyEmailConfirmationCode();
	}

	verifyEmailConfirmationCode(): void {
		this.apiService.get(`/users/verify/${this.confirmationCode}`).subscribe({
			next: (resp: any) => this.isVerified = true,
			error: () => this.isVerified = false
		});
	}
}