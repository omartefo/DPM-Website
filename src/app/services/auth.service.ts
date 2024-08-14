import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { UserInfo } from '../models';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private baseUrl = environment.apiUrl;
	userInfo = new BehaviorSubject<UserInfo | null>(null);

  	constructor(private http: HttpClient, 
				private router: Router) 
	{
		this.setUserInfo();
	}

	login(payload: any): Observable<any> {
		return this.http.post(`${this.baseUrl}/auth/login`, payload).pipe(catchError(this.handleError))
	}

	logout(): void {
		localStorage.removeItem('token');
		location.reload();
	}

	isLoggedIn(): boolean {
		const token = localStorage.getItem('token');
		return token !== null;
	}

	setUserInfo(user: UserInfo | null = null): void {
		if (user) {
			this.userInfo.next(user);
		}
		else 
		{
			const token = localStorage.getItem('token');
			if (token) {
				const decodedToken: UserInfo = jwtDecode(token);
				this.userInfo.next(decodedToken);
			}
		}
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = err.error.message || err.message;

		if (err.status === 401) {
			this.router.navigateByUrl('/login-type');
		}

		if (err.status === 504) {
			errorMessage = 'Gateway Timeout';
		}

		return throwError(() => new Error(errorMessage));
	}
}
