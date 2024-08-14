import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GenericApiResponse } from '../models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private baseUrl = environment.apiUrl;
	private _headers = new HttpHeaders();

  	constructor(private http: HttpClient, 
				private authService: AuthService,
				private router: Router) 
	{
		this.setHeaders();
	}

	get(slug: string): Observable<any> {
		return this.http.get(this.baseUrl + slug, { headers: this.headers })
			.pipe(catchError((error) => this.handleError(error)));
	}

	post(slug: string, payload: any): Observable<any> {
		return this.http.post<GenericApiResponse>(this.baseUrl + slug, payload, { headers: this.headers })
			.pipe(catchError((error) => this.handleError(error)));
	}

	patch(slug: string, payload: any): Observable<any> {
		return this.http.patch<GenericApiResponse>(this.baseUrl + slug, payload, { headers: this.headers })
			.pipe(catchError((error) => this.handleError(error)));
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = err.error.message || err.message;

		if (err.status === 401) {
			this.router.navigateByUrl('/login-type');
			this.authService.userInfo.next(null);
		}

		if (err.status === 504) {
			errorMessage = 'Gateway Timeout';
		}

		return throwError(() => new Error(errorMessage));
	}

	get headers(): HttpHeaders {
		this.setHeaders();
		return this._headers;
	}

	setHeaders(): any {
		const token = localStorage.getItem('token');
		this._headers = this._headers.set('authorization', 'Bearer ' + token);
	}
}
