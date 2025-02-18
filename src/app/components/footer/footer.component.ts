import { Component } from '@angular/core';
import { UserConfig } from 'src/app/common/constants/constants';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
	currentDate = new Date();
  contactNumber = UserConfig.contactNumber;
  contactEmail = UserConfig.contactEmail;
	contactAddress = UserConfig.contactAddress;

	constructor() { }
}
