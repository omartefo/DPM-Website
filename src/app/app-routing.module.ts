import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadCenterComponent } from './components/download-center/download-center.component';

import { AuthGuard } from './guards/auth.guard';

import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TenderDetailComponent } from './components/tenders/tender-detail/tender-detail.component';
import { TendersComponent } from './components/tenders/tenders.component';
import { TermsComponent } from './components/terms/terms.component';

import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BiddingFormComponent } from './components/tenders/bidding-form/bidding-form.component';
import { PricingComponent } from './components/tenders/pricing/pricing.component';

import { CreateAccountComponent } from './components/auth/create-account/create-account.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginTypeSelectionComponent } from './components/auth/login-type-selection/type-selection.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'tenders', component: TendersComponent, canActivate: [AuthGuard] },
	{ 
		path: 'bidding', 
		component: BiddingFormComponent, 
		data: { userTypes: ['Consultant', 'Supplier', 'Contractor'] }, 
		canActivate: [AuthGuard] 
	},
	{ 
		path: 'pricing/:tenderId', 
		component: PricingComponent, 
		data: { userTypes: ['Consultant', 'Supplier', 'Contractor'] }, 
		canActivate: [AuthGuard] 
	},
	{ 
		path: 'detail/:tenderId', 
		component: TenderDetailComponent, 
		data: { userTypes: ['Consultant', 'Supplier', 'Contractor', 'Client'] }, 
		canActivate: [AuthGuard] 
	},
	{ path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
	{ path: 'download_center', component: DownloadCenterComponent, canActivate: [AuthGuard] },
	{ path: 'projects', component: ProjectsComponent, data: { userTypes: ['Client'] }, canActivate: [AuthGuard] },
	{ path: 'terms', component: TermsComponent },
	{ path: 'contact_us', component: ContactUsComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

	// Auth related routes
	{ path: 'login-type', component: LoginTypeSelectionComponent },
	{ path: 'login/:type', component: LoginComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'create-account/:type', component: CreateAccountComponent },
	{ path: 'confirm/:confirmationCode', component: VerifyEmailComponent },
	{ path: 'resetPassword/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }