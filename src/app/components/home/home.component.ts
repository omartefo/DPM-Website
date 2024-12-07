import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

  redirectToInstagram(): void {
    window.open('https://www.instagram.com/doha_pm/', '_blank');
  }
}
