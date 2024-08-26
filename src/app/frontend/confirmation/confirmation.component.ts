import {
  Component,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Subscription, forkJoin, of, Observable } from 'rxjs';

import { BillService } from '../../services/bill/bill.service';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
import { BookingTypeService } from 'src/app/services/booking-type/booking-type.service';
import { UserComponent } from '../user/user.component';
import { UserBillService } from 'src/app/services/user-bill/user-bill.service';
import { AuthService } from '../../services/auth/auth.service';
import { Location } from '@angular/common';
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
  errorMessage: string = '';
  private routerSubscription: Subscription;
  
  constructor(
    private router: Router,
    private rendererFactory: RendererFactory2,
    private billService: BillService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userBillService: UserBillService,
    private authService: AuthService,
    private location: Location,
    
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // Lắng nghe sự kiện NavigationStart
   this.routerSubscription = this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      const excludedUrls = [ '/confirmation'];
      // Nếu URL không nằm trong danh sách loại trừ
      if (!excludedUrls.includes(event.url)) {
        sessionStorage.removeItem('user_data');
      }
    }
  });

  // Lắng nghe sự kiện popstate
  window.addEventListener('popstate', () => {
    const currentUrl = this.location.path();
    const excludedUrls = ['/confirmation'];
    // Nếu URL không nằm trong danh sách loại trừ
    if (!excludedUrls.includes(currentUrl)) {
      sessionStorage.removeItem('user_data');
    }
  });
  }

  async ngOnInit() {
  
    await this.handleQueryParams();
  }

  async handleQueryParams() {
    this.route.queryParams.subscribe(async (params) => {
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
        try {
          const response = await this.sendDataToApi(
            this.paramValue
          ).toPromise();
          console.log('Data has sent:', response);
          sessionStorage.setItem('data', JSON.stringify(response));
          this.createBill();
        } catch (error) {
          if (error instanceof HttpErrorResponse) {
            console.error('Error when send data:', error.message);
            console.error('Error detail:', error.error);
          } else {
            console.error('Unexpected error:', error);
          }
        }
      }
    });

  }


  async ngAfterViewInit() {
  }

  sendDataToApi(responseCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const user = sessionStorage.getItem('user_data');
    const showingRelease = sessionStorage.getItem('showingRelease');
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    const selectedFoodCombos = sessionStorage.getItem('selectedFoodCombos');
    const totalPriceTicketSeat = sessionStorage.getItem('totalPriceTicketSeat');
    const grandTotal = sessionStorage.getItem('grandTotal');
    const paymentMethod = sessionStorage.getItem('paymentForm');
    
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
      paymentMethod: paymentMethod ? JSON.parse(paymentMethod) : [],
    });
    
    return this.http.post(this.apiUrl, body, { headers });
  }

  createBill() {
    const billData = JSON.parse(sessionStorage.getItem('data') || '{}');
    console.log('bill', billData);
    this.barcode = billData?.data.barcode;
    this.userBillService.getBillDetail(billData?.data.bill.id).subscribe(
      data => {
        console.log(data);
        
        // Handle the data directly here
        this.bill = data.data;
        console.log(this.bill);
        
      },
      error => {
        // Handle errors here
        
      }
    );
    this.cdr.detectChanges();
  }
}
