// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class MovieBookingService {

//   private apiUrl = 'http://127.0.0.1:8000/api';

//   constructor(private http: HttpClient) {}

//   getCinemas(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/cinemas`);
//   }
//   getRooms(cinemaId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/rooms?cinema_id=${cinemaId}`);
//   }
// }


// cinema.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieBookingService {
  private cinemaUrl = 'http://127.0.0.1:8000/api/cinemas';
  private roomUrl = 'http://127.0.0.1:8000/api/rooms';
  private showingUrl = 'http://127.0.0.1:8000/api/admin/showingrelease';

  constructor(private http: HttpClient) { }
  getShowingReleasebyMovieId(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/admin/showingrelease/${id}/movie`);
  }
}
