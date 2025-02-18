// Angular core modules
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing module
import { AppRoutingModule } from './app-routing.module';

// 3rd party modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileSaverModule } from 'ngx-filesaver';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './components/auth/create-account/create-account.component';
import { LoginTypeSelectionComponent } from './components/auth/login-type-selection/type-selection.component';
import { LoginComponent } from './components/auth/login/login.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TendersComponent } from './components/tenders/tenders.component';

import { AnalyticsComponent } from './components/home/analytics/analytics.component';
import { ConnectWithUsComponent } from './components/home/connect-with-us/connect.component';
import { ContactUsMiniComponent } from './components/home/contact-us-mini/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewComponent } from './components/home/reviews/review.component';
import { ServicesOfferedComponent } from './components/home/services-offered/services.component';
import { ServicesComponent } from './components/home/services/services.component';
import { TeamComponent } from './components/home/team/team.component';

import { PaginationComponent } from './common/pagination/pagination.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { DownloadCenterComponent } from './components/download-center/download-center.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TendersTableComponent } from './components/profile/tenders-table/tenders-table.component';
import { BiddingFormComponent } from './components/tenders/bidding-form/bidding-form.component';
import { PricingComponent } from './components/tenders/pricing/pricing.component';
import { TenderDetailComponent } from './components/tenders/tender-detail/tender-detail.component';
import { TermsComponent } from './components/terms/terms.component';

@NgModule({
  declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		LoginTypeSelectionComponent,
		TendersComponent,
		ProjectsComponent,
		ContactUsComponent,
		TermsComponent,
		LoginComponent,
		CreateAccountComponent,
		VerifyEmailComponent,
		AddProjectComponent,
		// Home and its sub components
		HomeComponent,
		ServicesComponent,
		TeamComponent,
		ServicesOfferedComponent,
		ReviewComponent,
		AnalyticsComponent,
		ContactUsMiniComponent,
		ConnectWithUsComponent,
		BiddingFormComponent,
		PricingComponent,
		TenderDetailComponent,
		NotificationsComponent,
		PaginationComponent,
		ProfileComponent,
		TendersTableComponent,
		DownloadCenterComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent
	],
	bootstrap: [AppComponent], 
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		ToastrModule.forRoot(),
		ModalModule.forRoot(),
		FileSaverModule
	],
	providers: [
		provideHttpClient(withInterceptorsFromDi())
	]
})
export class AppModule { }
