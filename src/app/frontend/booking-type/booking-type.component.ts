import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
import { UserComponent } from '../user/user.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, forkJoin, of, Observable } from 'rxjs';
import { BookingTypeService } from 'src/app/services/booking-type/booking-type.service';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss'],
})
export class BookingTypeComponent implements OnInit {
  user: any = {};
  combo: any;
  paymentForm: FormGroup;
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];
  showingrelease: any;
  totalPriceTicketSeat: number = 0;
  totalPriceFoodCombo: number = 0;
  grandTotal: number = 0;
  bookingSummary: string = 'Booking summary';
  code: string = '';
  voucherResponse: any = null;
  errorMessage: string = '';
  private sessionTimeout: any;
  public apiUrl = 'http://127.0.0.1:8000/api/bill';
  formattedVoucherAmount: string = '';
  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seatBookingService: SeatBookingService,
    private http: HttpClient,
    private fb: FormBuilder,
    private foodComboService: FoodComboService,
    private bookingTypeService: BookingTypeService,
    private location: Location,
    private authService: AuthService,
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: [''],
    });
    window.addEventListener('submit', () => {
      // Gọi applyVoucherOnPayment sau khi submit
      this.applyVoucherOnPayment();
      sessionStorage.removeItem('grandTotal');
      sessionStorage.removeItem('totalPriceTicketSeat');
  });
   // Lắng nghe sự kiện NavigationStart
   this.routerSubscription = this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      const excludedUrls = [ '/booking-type', '/seat-booking'];
      // Nếu URL không nằm trong danh sách loại trừ
      if (!excludedUrls.includes(event.url)) {
        this.removeVoucher();
        sessionStorage.removeItem('grandTotal');
        sessionStorage.removeItem('totalPriceTicketSeat');
      }
    }
  });

  // Lắng nghe sự kiện popstate
  window.addEventListener('popstate', () => {
    const currentUrl = this.location.path();
    const excludedUrls = ['/booking-type'];
    // Nếu URL không nằm trong danh sách loại trừ
    if (!excludedUrls.includes(currentUrl)) {
      this.removeVoucher();
    }
  });
  }

  ngOnInit(): void {
    this.loadShowingRelease();
    this.loadTicketSeats();
    this.loadFoodCombos();
    this.calculateTotalPriceTicket();
    this.calculateTotalPriceFoodCombo();
    this.getUser();
  }

  getUser(): void {
    this.authService.getUser().subscribe({
      next: (response) => {
        this.user = response; // Gán dữ liệu người dùng vào biến
      },
      error: (error) => {
        this.errorMessage =
          'Unable to load user information. Please try again later.';
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/signin']);
        }
      },
    });
  }

  loadShowingRelease(): void {
    const showingRelease = sessionStorage.getItem('showingRelease');
    if (showingRelease) {
      this.showingrelease = JSON.parse(showingRelease);
    }
  }

  loadTicketSeats(): void {
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    if (selectedSeats) {
      this.selectedSeats = JSON.parse(selectedSeats);
    }
  }

  loadFoodCombos(): void {
    const selectedFoodCombos = sessionStorage.getItem('selectedFoodCombos');
    if (selectedFoodCombos) {
      this.selectedFoodCombos = JSON.parse(selectedFoodCombos);
    }
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calculateTotalPriceTicket() {
    this.totalPriceTicketSeat = 0;
    this.selectedSeats.forEach((seat) => {
      // Chuyển chuỗi thành số và loại bỏ các dấu phân cách hàng ngàn
      const price = parseFloat(
        (seat.seat.seat_type.price as string).replace(/,/g, '')
      );
      this.totalPriceTicketSeat += price;
      sessionStorage.setItem('totalPriceTicketSeat', JSON.stringify(this.totalPriceTicketSeat));
    });

    this.updateGrandTotal();
  }

  calculateTotalPriceFoodCombo(): void {
    this.totalPriceFoodCombo = 0;
    this.selectedFoodCombos.forEach((combo) => {
      const price = parseFloat((combo.price as string).replace(/,/g, ''));
      this.totalPriceFoodCombo += price * combo.quantity;
    });
    this.updateGrandTotal(); // Cập nhật tổng khi giá food combo đã được tính
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

  updateGrandTotal(): void {
    this.grandTotal = this.totalPriceTicketSeat + this.totalPriceFoodCombo;
  
    if (this.voucherResponse) {
      const amount = Number(this.voucherResponse.amount);
      if (this.voucherResponse.type === 'Fixed') {
        this.grandTotal -= amount;
      } else if (this.voucherResponse.type === 'Percent') {
        this.grandTotal -= this.grandTotal * (amount / 100);
      }
    }

    sessionStorage.setItem('grandTotal', JSON.stringify(this.grandTotal));
  }


  submit() {

    const paymentForm = this.paymentForm?.value;

    const user = {
      user: this.user
    }

    const bill = {
      user_id: this.user.id,
      grandTotal: this.grandTotal,
      paymentMethod: paymentForm?.paymentMethod,
    };

    const ticket_seat = {
      selectedSeats: this.selectedSeats,
      showingrelease: this.showingrelease,
      selectedFoodCombos: this.selectedFoodCombos,
      price: this.totalPriceTicketSeat,
    };

    const payload = {
      bill: bill,
      ticket_seat: ticket_seat,
      user: user,
    };

    this.http.post<any>(this.apiUrl, payload).subscribe((data) => {
      sessionStorage.setItem('billData', JSON.stringify(data));
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    });
  }
  applyVoucher(): void {
    console.log('Retrieving voucher info for code:', this.code);

    // Gọi service để lấy thông tin voucher từ server
    this.bookingTypeService.getVoucherInfo(this.code).subscribe(
        response => {
            if (response.status) {
               
                sessionStorage.setItem('voucherCode', response.data.code);
                sessionStorage.setItem('voucherType', response.data.type);
                sessionStorage.setItem('voucherAmount', response.data.amount.toString());


                this.voucherResponse = response.data;

                
                this.errorMessage = '';
                this.updateFormattedVoucherAmount();
                this.updateGrandTotal();
            } else {
                this.errorMessage = response.message;

            }
        },
        error => {
            this.errorMessage = 'Error retrieving voucher info';
            
        }
    );
}


  
  updateFormattedVoucherAmount(): void {
    if (this.voucherResponse) {
      const amount = Number(this.voucherResponse.amount);
      this.formattedVoucherAmount = this.voucherResponse.type === 'Fixed'
        ? amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : `${amount}%`;
    } else {
      this.formattedVoucherAmount = '';
    }
  }
  removeVoucher(): void {
    

    sessionStorage.removeItem('voucherCode');
    sessionStorage.removeItem('voucherType');
    sessionStorage.removeItem('voucherAmount');

    // Clear the local voucherResponse object
    this.voucherResponse = null;
    this.code = ''; 
    // Update UI calculations
    this.updateFormattedVoucherAmount();
    this.updateGrandTotal();

    
}

  applyVoucherOnPayment(): void {
    const storedVoucherCode = sessionStorage.getItem('voucherCode');

    if (storedVoucherCode) {
        console.log('Applying voucher on payment with code:', storedVoucherCode);

        this.bookingTypeService.applyVoucher(storedVoucherCode).subscribe(
            response => {
                if (response.status) {
                   
                    // Handle the success response, such as confirming the discount and proceeding with payment
                } else {
                 
                    this.errorMessage = 'Error retrieving voucher info';
                }
            },
            error => {
              this.errorMessage = 'Error applying voucher on payment';
            }
        );
    } else {
         this.errorMessage = 'No voucher code found in session storage.';
    }
}
onVoucherInputChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement && inputElement.value) {
    this.applyVoucher();
  } else {
    this.removeVoucher();
  }
}
    
}
