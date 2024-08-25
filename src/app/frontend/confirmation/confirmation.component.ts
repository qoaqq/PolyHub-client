import {
  Component,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { BillService } from '../../services/bill/bill.service';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
import { BookingTypeService } from 'src/app/services/booking-type/booking-type.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements AfterViewInit, OnInit {
  barcode: string | undefined;
  billData: any;
  bill: any;
  private renderer: Renderer2;
  private apiUrl = 'http://127.0.0.1:8000/api/vnPayCheckMail';
  paramValue: string | null = null;
  user: any = {};
  combo: any;
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];
  showingrelease: any;
  grandTotal: number = 0;

  constructor(
    private rendererFactory: RendererFactory2,
    private billService: BillService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient
    private userBillService: UserBillService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
        if (params['vnp_ResponseCode']) {
          this.paramValue = params['vnp_ResponseCode'];
          this.apiUrl = 'http://127.0.0.1:8000/api/vnPayCheckMail';
        } else if (params['message']) {
          this.paramValue = params['message'];
          this.apiUrl = 'http://127.0.0.1:8000/api/momoCheckMail';
        } else if (params['PayerID']) {
          this.paramValue = params['PayerID'];
          this.apiUrl = 'http://127.0.0.1:8000/api/paypalCheckMail';
        }
      
        if (this.paramValue) {
          this.sendDataToApi(this.paramValue).subscribe(
            (response: any) => {
              console.log('Dữ liệu đã được gửi:', response);
            },
            (error: HttpErrorResponse) => {
              console.error('Lỗi khi gửi dữ liệu:', error);
              console.error('Chi tiết lỗi:', error.error);
            }
          );
        }
    });
  }

  ngAfterViewInit() {
    this.createBill();
  }

  sendDataToApi(responseCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const user = sessionStorage.getItem('user');
    const showingRelease = sessionStorage.getItem('showingRelease');
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    const selectedFoodCombos = sessionStorage.getItem('selectedFoodCombos');
    const totalPriceTicketSeat = sessionStorage.getItem('totalPriceTicketSeat');
    const grandTotal = sessionStorage.getItem('grandTotal');

    // Tạo payload để gửi
    const body = JSON.stringify({
      responseCode,
      user: user ? JSON.parse(user) : {},
      showingRelease: showingRelease ? JSON.parse(showingRelease) : {},
      selectedSeats: selectedSeats ? JSON.parse(selectedSeats) : [],
      selectedFoodCombos: selectedFoodCombos
        ? JSON.parse(selectedFoodCombos)
        : [],
      totalPriceTicketSeat: totalPriceTicketSeat
        ? JSON.parse(totalPriceTicketSeat)
        : 0,
      grandTotal: grandTotal ? JSON.parse(grandTotal) : 0,
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

  createBill() {
    const billData = JSON.parse(sessionStorage.getItem('billData') || '{}');
    console.log('bill', billData.data.bill.grand_total);

    this.barcode = billData?.data.barcode;
    this.cdr.detectChanges();
  }
  getBill(){
    const billData = JSON.parse(sessionStorage.getItem('billData') || '{}');
    console.log(billData);
    this.userBillService.getBillDetail(billData?.data.bill.id).subscribe(
      data => {
        // Handle the data directly here
        this.bill = data.data;
        console.log(this.bill);
        
      },
      error => {
        // Handle errors here
        
      }
    );
  }
}
