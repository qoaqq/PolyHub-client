import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin'; // Địa chỉ API của Laravel
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // Kiểm tra token khi khởi tạo service
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
      this.loadUser();
    }
  }

  signin(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/signin`, { email, password })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
            this.loadUser();
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (
            (error.status === 422 && error.error.errors) ||
            (error.status === 403 && error.error.errors)
          ) {
            return throwError(error.error.errors);
          }
          return of({});
        })
      );
  }

  signout(): Observable<any> {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.user.next(null);
    return this.http.post<any>(`${this.apiUrl}/signout`, {});
  }

  signup(
    name: string,
    email: string,
    password: string,
    repassword: string,
    phonenumber: string,
    date_of_birth: string,
    gender: string
  ) {
    return this.http
      .post<any>(`${this.apiUrl}/signup`, {
        name,
        email,
        password,
        repassword,
        phonenumber,
        date_of_birth,
        gender,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422 && error.error.errors) {
            return throwError(error.error.errors);
          }
          return of({});
        })
      );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Handle unauthorized or forbidden error
          this.signout(); // Sign out if token is invalid
          return throwError('Unauthorized or Forbidden');
        } else if (error.status === 422 && error.error.errors) {
          return throwError(error.error.errors);
        }
        return throwError('Server error');
      })
    );
  }

  loadUser() {
    this.getUser().subscribe({
      next: (user) => {
        this.user.next(user);
        sessionStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng vào sessionStorage
      },
      error: (err) => {
        console.error('Failed to load user', err);
      },
    });
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}/user`, user, { headers }).pipe(
      catchError((errors) => {
        return throwError(errors.error.errors || 'Server error');
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserInfo(): Observable<any> {
    return this.user.asObservable();
  }
}
