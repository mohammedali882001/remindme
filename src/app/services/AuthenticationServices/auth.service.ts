import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../../models/Authentication/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<LoginResponse | null>;
  public loggedInUser$: Observable<LoginResponse | null>;

  constructor(private http: HttpClient) {
    this.loggedInUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    this.loggedInUser$ = this.loggedInUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/Account/Login`, { username, password })
      .pipe(
        tap(response => {
          // Store the logged-in user details in BehaviorSubject
          this.loggedInUserSubject.next(response);
        })
      );
  }

  logout(): void {
    // Clear the logged-in user details
    this.loggedInUserSubject.next(null);
    // Optionally, perform any other cleanup tasks (e.g., clear tokens, navigate to login page)
  }

  getLoggedInUser(): LoginResponse | null {
    return this.loggedInUserSubject.value;
  }
}
