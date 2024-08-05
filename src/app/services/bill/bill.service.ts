// src/app/bill.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private apiUrl = 'http://127.0.0.1:8000/api/bill';
  private tempBillData: any;

  constructor(private http: HttpClient) {}

  createBill(billData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, billData);
  }

  setTempBillData(billData: any) {
    this.tempBillData = billData;
  }

  getTempBillData() {
    return this.tempBillData;
  }
}
