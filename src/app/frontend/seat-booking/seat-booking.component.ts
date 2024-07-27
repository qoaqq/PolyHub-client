import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

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
  showingrelease: any = {}; // Sửa thành đối tượng
  private sessionTimeout: any;
  private routerSubscription: Subscription;

  constructor(
  private seatBookingService: SeatBookingService, 
  private router: Router,
  private route: ActivatedRoute
) {
  this.routerSubscription = this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      const excludedUrls = ['/food-combo', '/booking-type'];
      // Nếu URL không nằm trong danh sách loại trừ
      if (!excludedUrls.includes(event.url)) {
        this.clearSession();
      }
    }
  });
}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.showingId = params.get('id');
    });

    this.loadSeats();
    this.loadSeatTypes();
    this.seatBookingService.getShowingRelease(this.showingId).subscribe(data => {
      this.showingrelease = data.data;
    });
  }


  loadSeatTypes() {
    this.seatBookingService.getSeatTypes().subscribe(data => {
      this.seatTypes = data;
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

  onContinue(): void {
    // Lưu dữ liệu vào session storage
    sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
    sessionStorage.setItem('showingrelease', JSON.stringify(this.showingrelease));
    sessionStorage.setItem('selectedFoodCombos', JSON.stringify(this.showingrelease));

    // Cập nhật trạng thái ghế thành true
    this.selectedSeats.forEach(seat => {
      if (seat && seat.seat_id && seat.status==false) {
        this.seatBookingService.updateSeatStatus(this.showingId, seat.seat_id, true).subscribe(
          response => {
          },
          error => {
          }
        );
      } else {
        console.error(`Invalid seat data: ${JSON.stringify(seat)}`);
      }
    });

    // Đặt thời gian chờ 5 phút để xóa session và điều hướng về trang trước đó
    this.sessionTimeout = setTimeout(() => {
      this.clearSession();
      this.router.navigate(['/movies']);
    }, 5* 60 * 1000); // 5 phút

    // Điều hướng đến trang tiếp theo
    this.router.navigate(['/food-combo']);
  }

  clearSession(): void {
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');
    console.log(selectedSeats);
    
    // Cập nhật trạng thái ghế thành false
    selectedSeats.forEach((seat: any) => {
      if (seat && seat.seat_id) {
        this.seatBookingService.updateSeatStatus(this.showingId, seat.seat_id, false).subscribe(
          response => {
            console.log(`Seat ${seat.seat_id} status updated to false`);
          },
          error => {
            console.error(`Error updating status for seat ${seat.seat_id}`, error);
          }
        );
      } else {
        console.error(`Invalid seat data: ${JSON.stringify(seat)}`);
      }
    });

    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('showingrelease');
    sessionStorage.removeItem('selectedFoodCombos');
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
  }
}
