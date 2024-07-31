import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeatBookingService {

  public baseUrl = 'http://127.0.0.1:8000/api/admin';

  constructor(private http: HttpClient) { }

  // Phương thức lấy thông tin ghế theo showing release ID
  getSeats(showingReleaseId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/showingrelease/${showingReleaseId}/seats`);
  }
  getShowingRelease(showingReleaseId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/showingrelease/${showingReleaseId}`);
  }
  getSeatTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/seattypes`);
  }
  updateSeatStatus(showtimeId: any, seat_Id: number, status: boolean): Observable<any> {
    const url = `${this.baseUrl}/showingrelease/${showtimeId}/${seat_Id}/status`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { status };
    return this.http.post<any>(url, body, { headers });
  }

  checkSeatStatus(seatId: number): Observable<boolean> {
    return this.http.get<{ status: boolean }>(`${this.baseUrl}/showingrelease/${seatId}/status`).pipe(
      map(response => response.status)  // Trích xuất giá trị của thuộc tính `status`
    );
  }
 
}
