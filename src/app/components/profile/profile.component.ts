import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { GenericApiResponse, UserInfo } from './../../models';
import { ApiService } from './../../services/api.service';


interface Tab {
	name: string;
	title: string;
	selected: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user: UserInfo | null = null;
	tabs: Tab[] = [];
	selectedTab: Tab;

	constructor(private apiService: ApiService, 
				private toaster: ToastrService) 
	{
		this.tabs.push({ title: 'Notifications', name: 'notifications', selected: true });
		this.selectedTab = this.tabs[0];
	}

	ngOnInit(): void {
		this.getUserDetails();
	}
	
	getUserDetails(): void {
		this.apiService.get('/users/me').subscribe({
			next: (resp: GenericApiResponse) => {
				this.user = resp.data.user;
				if (this.user?.type === 'Client') {
					this.tabs.push({ title: 'My Projects', name: 'projects', selected: false });
				}
				else {
					this.tabs.push({ title: 'Tenders', name: 'tenders', selected: false });
					this.tabs.push({ title: 'Download Center', name: 'download_center', selected: false });
				}
			},
			error: (error: any) => this.toaster.error(error)
		});
	}

	onTabSelect(tab: Tab): void {
		for (let t of this.tabs) t.selected = false;

		tab.selected = true;
		this.selectedTab = tab;
	}
}
