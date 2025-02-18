import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { GenericApiResponse, UserInfo, UserNotification } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    standalone: false
})
export class NotificationsComponent implements OnInit {
	@Input() inUserProfile = false;

	notifications: UserNotification[] = [];
	user: UserInfo | null = null;
	searchFC = new FormControl();

	page = 1;
	limit = 10;
	totalRecords = 0;

	constructor(private apiService: ApiService,
				private authService: AuthService,
				private toaster: ToastrService) 
	{
		this.searchFC.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
			.subscribe(search => {
				this.getNotifications(search);
			});

		this.authService.userInfo.subscribe(userInfo => {
			this.user = userInfo;
		});
	}

	ngOnInit(): void {
		this.getNotifications();
	}

	getNotifications(search: string | null = null): void {
		let slug = `/notifications?page=${this.page}&limit=${this.limit}`;
		slug += search ? `&type=${search}` : '';

		this.apiService.get(slug).subscribe({
			next: (resp: GenericApiResponse) => {
				this.notifications = resp.data.notifications.rows;
				this.totalRecords = resp.data.notifications.count;
			},
			error: (error: any) => this.toaster.error(error)
		});
	}

	onPageChange(page: number): void {
		this.page = page;
		this.getNotifications();
	}
}
