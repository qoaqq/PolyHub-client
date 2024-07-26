import { Component, OnInit } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent implements OnInit {

  seats: any[] = [];
  rows: any[][] = [];
  seatsByRow: { [row: string]: any[] } = {};
  showingId: string | null = null;
  seatTypes: any[] = [];
  selectedSeats: any[] = [];
  showingrelease: any[] = [];
  constructor(private seatBookingService: SeatBookingService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.showingId = params.get('id');
      
    });
    this.loadSeats();
    this.loadSeatTypes();
    this.seatBookingService.getShowingRelease(this.showingId).subscribe(data => {
      this.showingrelease =  data.data;
    });
    console.log(this.showingrelease);
    
  }

  loadSeatTypes() {
    this.seatBookingService.getSeatTypes().subscribe(data => {
      this.seatTypes =  data;      
    });
  }

  isSelected(seat: any): boolean {
    return this.selectedSeats.includes(seat);
  }

  toggleSeat(seat: any): void {
    const index = this.selectedSeats.indexOf(seat);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }
    console.log(this.selectedSeats);
  }

  // bookSeats() {
  //   this.seatBookingService.bookSeats(this.selectedSeats).subscribe(response => {
  //     console.log('Seats booked successfully', response);
  //     // Xử lý sau khi đặt vé thành công, ví dụ: hiển thị thông báo hoặc chuyển hướng
  //   });
  // }

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
    if (this.showingId !== null) {
      this.seatBookingService.getSeats(this.showingId).subscribe(
        (data) => {
          this.seats = data;
          this.groupSeatsByRow();
        },
        (error) => {
          console.error('Error fetching seats:', error); // Xử lý lỗi
        }
      );
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
  
      

}



