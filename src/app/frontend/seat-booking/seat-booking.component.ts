import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription, forkJoin, of, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { concatMap, catchError } from 'rxjs/operators';

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
  showingId: string | null = null;
  seatTypes: any[] = [];
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];
  private routerSubscription: Subscription;
  private sessionTimeout: any;
  private sessionEndTime: number = 0;

  constructor(
    private seatBookingService: SeatBookingService, 
    private router: Router,
    private location: Location,
  ) {
    // Lắng nghe sự kiện NavigationStart
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const excludedUrls = ['/food-combo', '/booking-type', '/seat-booking'];
        // Nếu URL không nằm trong danh sách loại trừ
        if (!excludedUrls.includes(event.url)) {
          this.clearSession();
        }
      }
    });

    // Lắng nghe sự kiện popstate
    window.addEventListener('popstate', () => {
      const currentUrl = this.location.path();
      const excludedUrls = ['/food-combo', '/booking-type', '/seat-booking'];
      // Nếu URL không nằm trong danh sách loại trừ
      if (!excludedUrls.includes(currentUrl)) {
        this.clearSession();
      }
    });
  }

  ngOnInit() {
    // Đọc dữ liệu từ session storage và cập nhật selectedSeats
    const savedSeats = sessionStorage.getItem('selectedSeats');
    if (savedSeats) {
      this.selectedSeats = JSON.parse(savedSeats);
    }
    this.loadShowing();
    this.loadSelectedSeats();
    this.loadSeatTypes();

    this.resetSelectedSeatsStatus().subscribe(() => {
      this.loadSeats();
    });
  }

  loadShowing() {
    const showingRelease = sessionStorage.getItem('showingRelease');
    if (showingRelease) {
      const showing = JSON.parse(showingRelease);
      this.movieId = showing.movie_id;
      this.showingId = showing.id;
    }
  }

  resetSelectedSeatsStatus(): Observable<void> {
    if (this.selectedSeats.length === 0) {
      return of(void 0); // Nếu không có ghế nào được chọn, trả về Observable hoàn thành ngay lập tức
    }

    const resetRequests = this.selectedSeats.map((seat: any) =>
      this.seatBookingService.updateSeatStatus(this.showingId, seat.seat_id, false)
    );

    return forkJoin(resetRequests).pipe(
      concatMap(() => {
        return of(void 0);
      }),
      catchError(error => {
        console.error('Error resetting selected seats:', error);
        return of(void 0);
      })
    );
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
    // Gọi API với showingId
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
  
    // Kiểm tra trạng thái của các ghế đã chọn
    this.checkSeatsStatus(this.selectedSeats).subscribe(statuses => {
      const anySeatBooked = statuses.some(status => status === true);
      
      if (anySeatBooked) {
        alert('Some selected seats are already booked. Please select other seats.');
        return;
      }
  
      const existingSessionEndTime = sessionStorage.getItem('sessionEndTime');
      if (existingSessionEndTime && Date.now() < +existingSessionEndTime) {
        this.sessionEndTime = +existingSessionEndTime;
      } else {
        // Đặt thời gian kết thúc phiên mới nếu không tồn tại hoặc đã hết hạn
        this.sessionEndTime = Date.now() + 5 * 60 * 1000; // 5 phút từ bây giờ
        sessionStorage.setItem('sessionEndTime', this.sessionEndTime.toString());
      }
  
      // Đặt thời gian chờ 5 phút để xóa session và điều hướng về trang trước đó
      this.sessionTimeout = setTimeout(() => {
        this.clearSession();
        this.router.navigate(['/movies']);
      }, this.sessionEndTime - Date.now()); // thời gian còn lại
  
      // Tạo mảng các Observable để cập nhật trạng thái ghế
      const updateRequests = this.selectedSeats.map(seat => 
        this.seatBookingService.updateSeatStatus(this.showingId, seat.seat_id, true)
      );
  
      // Sử dụng forkJoin để đợi tất cả các yêu cầu hoàn thành
      forkJoin(updateRequests).subscribe(() => {
        // Điều hướng đến trang food-combo sau khi tất cả các ghế đã được cập nhật
        this.router.navigate(['/food-combo']);
      }, error => {
        console.error('Error updating seats:', error);
        alert('Failed to update seat status. Please try again.');
      });
    }, error => {
      console.error('Error checking seat statuses:', error);
      alert('Failed to check seat statuses. Please try again.');
    });
  }

  checkSeatsStatus(seats: any[]): Observable<boolean[]> {
    const statusRequests = seats.map(seat => 
      this.seatBookingService.checkSeatStatus(seat.id)
    );
    return forkJoin(statusRequests);
  }

  clearSession(): void {
    if (this.selectedSeats.length > 0) {
      const resetRequests = this.selectedSeats.map(seat =>
        this.seatBookingService.updateSeatStatus(this.showingId, seat.seat_id, false)
      );

      forkJoin(resetRequests).subscribe(() => {
        sessionStorage.removeItem('selectedSeats');
        sessionStorage.removeItem('showingRelease');
        sessionStorage.removeItem('selectedFoodCombos');
        sessionStorage.removeItem('sessionEndTime');
        if (this.sessionTimeout) {
          clearTimeout(this.sessionTimeout);
        }
      }, error => {
        console.error('Error resetting seats:', error);
        alert('Failed to reset seat status. Please try again.');
      });
    } else {
      sessionStorage.removeItem('selectedSeats');
      sessionStorage.removeItem('showingRelease');
      sessionStorage.removeItem('selectedFoodCombos');
      sessionStorage.removeItem('sessionEndTime');
      if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout);
      }
    }
  }
}
