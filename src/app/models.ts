export type LoginAccountType = 'Client' | 'Supplier' | 'Contractor' | 'Consultant';

export interface GenericApiResponse {
	status: 'success' | 'fail' | 'error',
	data: any;
	access_token: string;
	message: string;
	totalRecords: number;
}

export interface LoginType {
	type: LoginAccountType;
	image: string;
}

export interface UserInfo {
	userId: number;
	name: string;
	email: string;
	mobileNumber: string;
	type: LoginAccountType;
	canParticipateInTenders: boolean;
	bids: Bid[];
	company: UserCompany;
}

export interface Project {
	projectId: number;
	name: string;
	location: string;
	description: string;
	type: string;
	image: string;
	isApproved: boolean;
}

export interface Tender {
	tenderId: number;
	tenderNumber: string;
	type: string;
	openingDate: Date;
	closingDate: Date;
	location: string;
	description: string;
	projectId: number;
	documents: any;
	document1: string;
	document2: string;
	document3: string;
	awardedTo: number;

	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	
	/*
		remainingTime = '2 Days, 10 hours'
		remainingTime = 0 if tender is closed
		remainingTime = -1 if tender is not started yet.
	*/
	remainingTime: string | 0 | -1;
	status: 'Open' | 'Under Evaluation';
	submitting: boolean;
	canBid: boolean;
	bid?: Bid;
	noOfParticipants: number;
}

export interface Bid {
	biddingId: number;
	tenderId: number;
	user: UserInfo;
	durationInNumbers: number;
	priceInNumbers: number;
	status: string;
}

export interface UserCompany {
	companyId: number;
	name: string;
	commercialRegNumber: string;
	address: string;
	totalEmployees: number;
}

export interface UserNotification {
	notificationId: number;
	userId: number;
	type: 'email' | 'sms';
	content: string;
	createdAt: Date
}