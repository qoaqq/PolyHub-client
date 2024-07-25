import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss'],
})
export class BookingTypeComponent implements OnInit, OnDestroy {
  combo: any;
  paymentForm: FormGroup;
  selectedFoodCombos: any[] = [];
  selectedSeats: any[] = [];
  showingrelease: any = {};
  private sessionTimeout: any;
  public apiUrl = 'http://127.0.0.1:8000/api/payment';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seatBookingService: SeatBookingService,
    private http: HttpClient,
    private fb: FormBuilder,
    
    
  ) {
    this.paymentForm = this.fb.group({
      subtotal: [0],
      paymentMethod: [''],
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['selectedSeats']) {
        this.selectedSeats = JSON.parse(params['selectedSeats']);
      }
      if (params['showingrelease']) {
        try {
          this.showingrelease = JSON.parse(params['showingrelease']);
          console.log(this.showingrelease); // Kiểm tra dữ liệu
        } catch (e) {
          console.error('Error parsing showingrelease:', e);
        }
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.sessionTimeout);
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  formatTime2(dateString: string): string {
    if (!dateString) {
      throw new Error('Date string is undefined or empty');
    }

    const formattedDateString = dateString.replace(' ', 'T');
    const date = new Date(formattedDateString);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  sendData() {
    const storedValue = sessionStorage.getItem('totalCost');
    console.log("them thanh cong:", storedValue);
    return this.http.post(this.apiUrl, { storedValue });
  }

}