import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

@Component({
  selector: 'app-food-combo',
  templateUrl: './food-combo.component.html',
  styleUrls: ['./food-combo.component.scss']
})
export class FoodComboComponent implements OnInit {
  foodCombos: { id: number; name: string; description: string; price: number; quantity: number; avatar?: string; }[] = [];
  selectedFoodCombos: { id: number; name: string; quantity: number; price: number }[] = [];
  selectedSeats: any[] = [];
  totalPriceTicketSeat: number = 0;
  totalPriceFoodCombo: number = 0;
  showingRelease: any;

  constructor(
    private seatBookingService: SeatBookingService, 
    private foodComboService: FoodComboService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const savedCombos = sessionStorage.getItem('selectedFoodCombos');
    if (savedCombos) {
      this.selectedFoodCombos = JSON.parse(savedCombos);
    }
    this.loadFoodCombos();
    this.loadShowingRelease();
    this.loadTicketSeats();
    this.calculateTotalPrice();
  }

  loadTicketSeats(): void {
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    if (selectedSeats) {
      this.selectedSeats = JSON.parse(selectedSeats);
    }
  }

  private calculateTotalPrice(): void {
    // Tính tổng giá vé
    this.totalPriceTicketSeat = this.selectedSeats.reduce((total, seat) => {
      const price = parseFloat((seat.seat.seat_type.price as string).replace(/,/g, ''));
      return total + price;
    }, 0);

    // Tính tổng giá food combo
    this.totalPriceFoodCombo = this.selectedFoodCombos.reduce((total, combo) => {
      return total + (combo.quantity * combo.price);
    }, 0);

    // Cộng cả hai tổng vào nhau
    this.totalPriceTicketSeat += this.totalPriceFoodCombo;
  }

  loadFoodCombos(): void {
    this.foodComboService.getFoodCombos().subscribe(
      (data) => {
        this.foodCombos = data.map((combo: any) => {
          const storedCombo = this.selectedFoodCombos.find(c => c.id === combo.id);
          return {
            ...combo,
            quantity: storedCombo ? storedCombo.quantity : 0
          };
        });
      },
      (error) => {
        console.error('Error fetching food combos:', error);
      }
    );
  }

  loadShowingRelease(): void {
    const showingRelease = sessionStorage.getItem('showingRelease');
    if (showingRelease) {
      this.showingRelease = JSON.parse(showingRelease);
    }
  }

  increaseQuantity(comboId: number): void {
    this.updateQuantity(comboId, 1);
  }

  decreaseQuantity(comboId: number): void {
    this.updateQuantity(comboId, -1);
  }

  onQuantityChange(comboId: number, event: any): void {
    const newQuantity = +event.target.value;
    this.updateQuantity(comboId, newQuantity - this.getQuantity(comboId));
  }

  private updateQuantity(comboId: number, change: number): void {
    const combo = this.foodCombos.find(c => c.id === comboId);
    if (!combo) return;

    const selectedCombo = this.selectedFoodCombos.find(c => c.id === comboId);
    if (selectedCombo) {
      selectedCombo.quantity = Math.max(selectedCombo.quantity + change, 0);
    } else {
      if (change > 0) {
        this.selectedFoodCombos.push({
          id: comboId,
          name: combo.name,
          quantity: change,
          price: combo.price
        });
      }
    }

    // Xóa combo nếu số lượng là 0
    this.selectedFoodCombos = this.selectedFoodCombos.filter(c => c.quantity > 0);

    // Cập nhật số lượng trong foodCombos
    this.foodCombos = this.foodCombos.map(c => 
      c.id === comboId ? { ...c, quantity: this.getQuantity(comboId) } : c
    );

    // Cập nhật sessionStorage
    sessionStorage.setItem('selectedFoodCombos', JSON.stringify(this.selectedFoodCombos));

    // Tính toán lại tổng giá
    this.calculateTotalPrice();
  }

  private getQuantity(comboId: number): number {
    const combo = this.selectedFoodCombos.find(c => c.id === comboId);
    return combo ? combo.quantity : 0;
  }
}
