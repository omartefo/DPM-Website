import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as _ from 'underscore';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: false
})
export class PaginationComponent implements OnChanges {
	@Input() totalRecords = 0;
	@Input() limit = 0;

	@Output() pageChange = new EventEmitter();

	pagesCount = 1;
	currentPage = 1;
	pages: number[] = [];

	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.hasOwnProperty('totalRecords') && changes['totalRecords'].currentValue) {
			this.pagesCount = Math.ceil(this.totalRecords / this.limit);
			this.pages = _.range(1, this.pagesCount + 1);
		}
	}

	onPageChange(page: number): void {
		this.currentPage = page;
		this.pageChange.emit(page);
	}
}
