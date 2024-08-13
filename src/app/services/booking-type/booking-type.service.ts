import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingTypeService {
  private voucherUrl = 'http://127.0.0.1:8000/api/voucher/applyvoucher';
  
  constructor(private http: HttpClient) {}

  applyVoucher(code: any): Observable<any>{
      const body = {
        code: code
      };
      return this.http.post(this.voucherUrl, body);
  }
}
