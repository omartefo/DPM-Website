import { Component, Input, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { GenericApiResponse } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-download-center',
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.scss']
})
export class DownloadCenterComponent implements OnInit {
	@Input() inUserProfile = false;
	
	downloads: any[] = [];
	
	page = 1;
	limit = 10;
	totalRecords = 0;

	constructor(private apiService: ApiService,
				private fileSaverService: FileSaverService,
				private toaster: ToastrService) 
	{ }

	ngOnInit(): void {
		this.getAllDownloads();
	}

	getAllDownloads(): void {
		const slug = `/downloads?page=${this.page}&limit=${this.limit}`

		this.apiService.get(slug).subscribe({
			next: (resp: GenericApiResponse) => {
				this.downloads = resp.data.downloads.rows;
				this.totalRecords = resp.data.downloads.count;
			},
			error: (error: any) => this.toaster.error(error)
		});
	}

	getFileName = (path: string) => path.substring(path.lastIndexOf('/')+1);

	onDownload(urls: string[]): void {
		const zip = new JSZip()
		const folder = zip.folder('downloads');

		urls.forEach((url)=> {
			const blobPromise = fetch(url).then(r => {
				if (r.status === 200) return r.blob()
				return Promise.reject(new Error(r.statusText))
			})
			const name = url.substring(url.lastIndexOf('/'))
			folder?.file(name, blobPromise)
		})
		
		zip.generateAsync({ type:"blob" }).then(content => {
			this.fileSaverService.save(content, 'downloads.zip');
		});
	}

	onPageChange(page: number): void {
		this.page = page;
		this.getAllDownloads();
	}
}
