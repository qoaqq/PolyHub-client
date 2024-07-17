import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin'; // Địa chỉ API của Laravel

  constructor(private http: HttpClient) { }

  signin(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/signin`, { email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422 && error.error.errors || error.status === 403 && error.error.errors) {
            return throwError(error.error.errors);
          }
          // Trả về một observable rỗng hoặc giá trị tùy chỉnh để tránh lỗi console
          return of({});
        })
      );
  }

  signout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post<any>(`${this.apiUrl}/signout`, {});
  }

  signup(name: string, email: string, password: string, repassword: string, phonenumber: string, date_of_birth: string) {
    return this.http.post<any>(`${this.apiUrl}/signup`, { name, email, password, repassword, phonenumber, date_of_birth})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422 && error.error.errors) {
            return throwError(error.error.errors);
          }
          return of({}); // Trả về một object rỗng để tránh lỗi console
        })
      );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/user`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422 && error.error.errors) {
            return throwError(error.error.errors);
          }
          return of({}); // Trả về một object rỗng để tránh lỗi console
        })
      );
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/user`, user, { headers })
      .pipe(
        catchError((errors) => {
          return throwError(errors.error.errors || 'Server error');
        })
      );
  }
}

