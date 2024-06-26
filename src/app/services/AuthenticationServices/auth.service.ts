import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../../models/Authentication/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject: BehaviorSubject<boolean>; // Changed to boolean
  public loggedInUser$: Observable<boolean>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.loggedInUserSubject = new BehaviorSubject<boolean>(!!token); // Initialize with token presence
    this.loggedInUser$ = this.loggedInUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/Account/Login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.data.token);
          this.setLoggedInState(true); // Emit login state change
        })
      );
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post(`${environment.baseUrl}/Account/logout`, {}, { headers: { 'Authorization': `Bearer ${token}` } }).subscribe(() => {
        localStorage.removeItem('token');
        this.setLoggedInState(false); // Emit logout state change
      });
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

    setLoggedInState(isLoggedIn: boolean): void {
    this.loggedInUserSubject.next(isLoggedIn);
  }
}
