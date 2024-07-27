import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent implements OnInit {

  seats: any[] = [];
  rows: any[][] = [];
  seatsByRow: { [row: string]: any[] } = {};
  movieId: string | null = null;
  seatTypes: any[] = [];
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];

  constructor(
    private seatBookingService: SeatBookingService, 
    private router: Router,
  ) {
    this.loadSelectedSeats();
  }

  ngOnInit(): void {

    // Đọc dữ liệu từ session storage và cập nhật selectedSeats
    const savedSeats = sessionStorage.getItem('selectedSeats');
    if (savedSeats) {
      this.selectedSeats = JSON.parse(savedSeats);
    }

    this.loadSeats();
    this.loadSeatTypes();
  }

  loadSeatTypes() {
    this.seatBookingService.getSeatTypes().subscribe(data => {
      this.seatTypes = data;
    });
  }

  isSelected(seat: any): boolean {
    return this.selectedSeats.some(selectedSeat => selectedSeat.seat_id === seat.seat_id);
  }

  toggleSeat(seat: any): void {
    const seatIndex = this.selectedSeats.findIndex(s => s.id === seat.id);
    
    if (seatIndex > -1) {
      // Nếu ghế đã được chọn, xóa khỏi danh sách
      this.selectedSeats.splice(seatIndex, 1);
    } else {
      // Nếu ghế chưa được chọn, thêm vào danh sách
      this.selectedSeats.push(seat);
    }

    // Cập nhật session storage
    sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
  }
  // Tải ghế đã chọn từ session storage
  loadSelectedSeats(): void {
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    if (selectedSeats) {
      this.selectedSeats = JSON.parse(selectedSeats);
    }
  }

  getSeatTypeClass(seatType: any): string {
    switch (seatType.name.toLowerCase()) {
      case 'standard':
        return 'seat-type seat-type-standard';
      case 'vip':
        return 'seat-type seat-type-vip';
      case 'couple':
        return 'seat-type seat-type-couple';
      default:
        return 'seat-type';
    }
  }

  getColor(seatType: any): string {
    switch (seatType.name.toLowerCase()) {
      case 'standard':
        return 'green';
      case 'vip':
        return 'red';
      case 'couple':
        return 'pink';
      default:
        return 'gray';
    }
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

  loadSeats(): void {
    const showingRelease = sessionStorage.getItem('showingRelease');
    if (showingRelease) {
      const showing = JSON.parse(showingRelease);
      this.movieId = showing.movie_id;
      const showingId = showing.id;
      
      
      // Gọi API với showingId
      this.seatBookingService.getSeats(showingId).subscribe(
        (data) => {
          this.seats = data;
          console.log(this.seats);
          this.groupSeatsByRow();
        },
        (error) => {
          console.error('Error fetching seats:', error); // Xử lý lỗi
        }
      );
    } else {
      console.warn('No showing release found in session storage.');
    }
  }

  groupSeatsByRow(): void {
    this.seatsByRow = this.seats.reduce((acc, seat) => {
      const row = seat.seat.row;
      if (!acc[row]) {
        acc[row] = [];
      }
      acc[row].push(seat);
      return acc;
    }, {});
  }

  getRows(): string[] {
    return Object.keys(this.seatsByRow).sort(); // Sắp xếp ký tự theo thứ tự bảng chữ cái
  }

  goToFoodCombo(): void {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat before proceeding.');
      return;
    }

    // Điều hướng đến trang foodcombo
    this.router.navigate(['/food-combo']);
  }
  
}
