import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SilderVideoService {
  private imageUrl = 'http://localhost:8000/api/image';
  constructor(private http: HttpClient) { }

  getImage(): Observable<any> {
    return this.http.get(this.imageUrl);
  }
}
