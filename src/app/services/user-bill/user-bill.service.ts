import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserBillService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/getbill';  // URL to Laravel API
  private loggedIn = new BehaviorSubject<boolean>(false);
  

  constructor(private http: HttpClient) {
    // Kiểm tra token khi khởi tạo service
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
      this.getBills();
    }
  }


  getBills(): Observable<any> {
    // return this.http.get<any>(this.apiUrl);
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

}
