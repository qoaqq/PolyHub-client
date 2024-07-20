import { Component, OnInit } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent implements OnInit {

  seats: any[] = [];
  showingId: any;
  selectedSeats: Set<number> = new Set();
  selectedSeatCount: number = 0;
  constructor(private seatBookingService: SeatBookingService, private router: Router) { }

  ngOnInit(): void {
    this.loadShowingId();
    if (this.showingId !== null) {
      this.loadSeats();
    }
    this.loadSelectedSeats();
  }

  loadShowingId(): void {
    // Lấy ID của showing từ sessionStorage
    const showingId = sessionStorage.getItem('selectedShowing');
    if (showingId) {
      this.showingId = JSON.parse(showingId);
      console.log(this.showingId);
    }
  }

  loadSeats(): void {
    if (this.showingId !== null) {
      this.seatBookingService.getSeats(this.showingId.id).subscribe(
        (data) => {
          this.seats = data;
          console.log('Seats:', this.seats); // Hiển thị dữ liệu ghế trong console
        },
        (error) => {
          console.error('Error fetching seats:', error); // Xử lý lỗi
        }
      );
    }
  }

  loadSelectedSeats(): void {
    // Tải thông tin ghế đã chọn từ sessionStorage nếu có
    const storedSeats = sessionStorage.getItem('selectedSeats');
    if (storedSeats) {
      this.selectedSeats = new Set(JSON.parse(storedSeats));
    }
  }

  isSelected(seatId: number): boolean {
    return this.selectedSeats.has(seatId);
  }

  // onSeatChange(seatId: number): void {
  //   if (this.selectedSeats.has(seatId)) {
  //     this.selectedSeats.delete(seatId);
  //   } else {
  //     this.selectedSeats.add(seatId);
  //   }
  //   // Lưu thông tin ghế đã chọn vào sessionStorage
  //   sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(this.selectedSeats)));

  // }
  onSeatChange(seatId: number): void {
    // Determine if the seat is currently selected
    const isSelected = this.selectedSeats.has(seatId);
    const newStatus = !isSelected; // Toggle status for the seat
  
    console.log(`Toggling seat ${seatId}. Current selected: ${isSelected}. New status: ${newStatus}`);
  
    // Update seat status on the server
    this.seatBookingService.updateSeatStatus(this.showingId.id, seatId, newStatus).subscribe(
      (response) => {
        console.log(`Server response:`, response); // Log server response
  
        // On success, update the selectedSeats Set
        if (isSelected) {
          this.selectedSeats.delete(seatId); // Remove seat if previously selected
        } else {
          this.selectedSeats.add(seatId); // Add seat if not previously selected
        }
  
        // Save updated selection to sessionStorage
        sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(this.selectedSeats)));
        this.updateSelectedSeatCount();
      },
      (error) => {
        console.error('Error updating seat status:', error);
  
        // Optionally, show a user-friendly message or revert changes if necessary
        // this.showErrorMessage('Failed to update seat status. Please try again.');
      }
    );
  }
  updateSelectedSeatCount(): void {
    this.selectedSeatCount = this.selectedSeats.size;
  }
  

  confirmSelection(): void {
    // Điều hướng đến trang tóm tắt
    this.router.navigate(['/booking-type']);
  }
}
