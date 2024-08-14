import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

import { UserComponent } from '../user/user.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookingTypeService } from 'src/app/services/booking-type/booking-type.service';

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
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seatBookingService: SeatBookingService,
    private http: HttpClient,
    private fb: FormBuilder,
    private foodComboService: FoodComboService,
    private bookingTypeService: BookingTypeService
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: [''],
    });
    window.addEventListener('submit', () => {
      // Gọi applyVoucherOnPayment sau khi submit
      this.applyVoucherOnPayment();
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
    const user = sessionStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  loadShowingRelease(): void {
    const showingRelease = sessionStorage.getItem('showingRelease');
    if (showingRelease) {
      this.showingrelease = JSON.parse(showingRelease);
      console.log(this.showingrelease);
    }
  }

  loadTicketSeats(): void {
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    if (selectedSeats) {
      this.selectedSeats = JSON.parse(selectedSeats);
      console.log(this.selectedSeats);
    }
  }

  loadFoodCombos(): void {
    const selectedFoodCombos = sessionStorage.getItem('selectedFoodCombos');
    if (selectedFoodCombos) {
      this.selectedFoodCombos = JSON.parse(selectedFoodCombos);
      console.log(this.selectedFoodCombos);
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
    });

    this.updateGrandTotal(); // Cập nhật tổng khi giá vé đã được tính
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

  // updateGrandTotal(): void {
  //   this.grandTotal = this.totalPriceTicketSeat + this.totalPriceFoodCombo;
  // }
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

    console.log('Token:', payload);


    this.http.post<any>(this.apiUrl, payload).subscribe((data) => {
      console.log(data);
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
                // Lưu chi tiết voucher vào session storage
                sessionStorage.setItem('voucherCode', response.data.code);
                sessionStorage.setItem('voucherType', response.data.type);
                sessionStorage.setItem('voucherAmount', response.data.amount.toString());

                // Cập nhật đối tượng voucherResponse cục bộ
                this.voucherResponse = response.data;

                // Cập nhật giao diện UI
                this.errorMessage = '';
                this.updateFormattedVoucherAmount();
                this.updateGrandTotal();

                console.log('Voucher details stored in session:', this.voucherResponse);
            } else {
                this.errorMessage = response.message;
                console.log('Voucher validation failed:', this.errorMessage);
            }
        },
        error => {
            this.errorMessage = 'Error retrieving voucher info';
            console.error('Error:', error);
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
    console.log('Removing voucher from session storage');

    sessionStorage.removeItem('voucherCode');
    sessionStorage.removeItem('voucherType');
    sessionStorage.removeItem('voucherAmount');

    // Clear the local voucherResponse object
    this.voucherResponse = null;
    this.code = ''; 
    // Update UI calculations
    this.updateFormattedVoucherAmount();
    this.updateGrandTotal();

    console.log('Voucher removed from session storage');
}

  applyVoucherOnPayment(): void {
    const storedVoucherCode = sessionStorage.getItem('voucherCode');

    if (storedVoucherCode) {
        console.log('Applying voucher on payment with code:', storedVoucherCode);

        this.bookingTypeService.applyVoucher(storedVoucherCode).subscribe(
            response => {
                if (response.status) {
                    console.log('Voucher applied successfully on payment:', response.data);
                    // Handle the success response, such as confirming the discount and proceeding with payment
                } else {
                    console.error('Failed to apply voucher:', response.message);
                }
            },
            error => {
                console.error('Error applying voucher on payment:', error);
            }
        );
    } else {
        console.error('No voucher code found in session storage.');
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
