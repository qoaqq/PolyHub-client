import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss'],
})
export class BookingTypeComponent implements OnInit {
  combo: any;
  paymentForm: FormGroup;
  selectedSeats: any[] = [];
  foodCombos: any[] = [];
  selectedFoodCombos: { id: number; name: string; quantity: number; price: number }[] = [];
  showingrelease: any = {};
  totalPriceTicketSeat: number = 0;
  totalPriceFoodCombo: number = 0;
  grandTotal: number = 0;

  private sessionTimeout: any;
  public apiUrl = 'http://127.0.0.1:8000/api/payment';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seatBookingService: SeatBookingService,
    private http: HttpClient,
    private fb: FormBuilder,
    private foodComboService: FoodComboService
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
        this.calculateTotalPriceTicket();
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
    this.loadFoodCombos();
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calculateTotalPriceTicket() {
    this.totalPriceTicketSeat = 0;
    this.selectedSeats.forEach(seat => {
      // Chuyển chuỗi thành số và loại bỏ các dấu phân cách hàng ngàn
      const price = parseFloat((seat.seat.seat_type.price as string).replace(/,/g, ''));
      this.totalPriceTicketSeat += price;
    });
    this.updateGrandTotal(); // Cập nhật tổng khi giá vé đã được tính
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

  loadFoodCombos(): void {
    this.foodComboService.getFoodCombos().subscribe(
      (data: any) => {
          this.foodCombos = data;
      },
      error => {
        console.error('Error fetching food combos:', error);
      }
    );
  }

  updateQuantity(combo: any, quantity: number): void {
    const existingCombo = this.selectedFoodCombos.find(c => c.id === combo.id);

    if (existingCombo) {
      if (quantity > 0) {
        existingCombo.quantity = quantity;
      } else {
        this.selectedFoodCombos = this.selectedFoodCombos.filter(c => c.id !== combo.id);
      }
    } else if (quantity > 0) {
      this.selectedFoodCombos.push({
        id: combo.id,
        name: combo.name,
        quantity: quantity,
        price: parseFloat(combo.price) // Chuyển đổi giá từ chuỗi thành số
      });
    }
    this.calculateTotalPriceFoodCombo();
  }

  calculateTotalPriceFoodCombo(): void {
    this.totalPriceFoodCombo = this.selectedFoodCombos.reduce((total, combo) => {
      return total + (combo.price * combo.quantity);
    }, 0);
    this.updateGrandTotal(); // Cập nhật tổng khi giá food combos đã được tính
  }

  updateGrandTotal(): void {
    this.grandTotal = this.totalPriceTicketSeat + this.totalPriceFoodCombo;
  }
}
