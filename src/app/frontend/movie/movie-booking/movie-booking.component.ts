import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,NavigationStart} from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking/movie-booking.service';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-booking',
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.scss']
})
export class MovieBookingComponent implements OnInit {

  cinemas: any[] = [];
  rooms: any[] = [];
  showingReleases: any[] = [];
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];
  movieId: string | null = null;
  private sessionTimeout: any;
  private routerSubscription: Subscription;
  private sessionEndTime: number = 0;

  constructor(
    private seatBookingService: SeatBookingService, 
    private movieBookingService: MovieBookingService,
     private router: Router,
     private route: ActivatedRoute,
    ) {  this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const excludedUrls = ['/food-combo', '/booking-type','/seat-booking'];
        // Nếu URL không nằm trong danh sách loại trừ
        if (!excludedUrls.includes(event.url) ) {
          this.clearSession();
        }
      }
    });}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
    });
    this.fetchData();
   
    
  }

  fetchData(): void {
    this.movieBookingService.getCinemas().subscribe(cinemaResponse => {
      this.cinemas = cinemaResponse.data.data;

      this.movieBookingService.getRooms().subscribe(roomResponse => {
        this.rooms = roomResponse.data.data;

          this.movieBookingService.getShowingReleasebyMovieId(this.movieId).subscribe(showingbyMovie => {
            this.showingReleases = showingbyMovie.data;
            this.mergeData();
          });
        
      });
    })
  }
  mergeData(): void {
    
    this.rooms.forEach(room => {
      room['showingReleases'] = this.showingReleases
        .filter(showing => showing.room_id == room.id && showing.movie_id == this.movieId);
    });

    this.cinemas.forEach(cinema => {
      cinema['rooms'] = this.rooms.filter(room => room.cinema_id === cinema.id && room['showingReleases'].length > 0);
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  formatTime2(dateString: string): string {
    const date = new Date(dateString);
    return `${date}`;
  }
  onContinue(showing: any): void {
    this.seatBookingService.getShowingRelease(showing.id).subscribe(
      (data) => {
        sessionStorage.setItem('showingRelease', JSON.stringify(data.data));
      },
      (error) => {
        console.error('Error fetching seats:', error); // Xử lý lỗi
      }
    );
    // Lưu dữ liệu showing release vào session storage
    sessionStorage.setItem('selectedFoodCombos', JSON.stringify(this.selectedFoodCombos));
    sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
    // Đặt thời gian kết thúc phiên
    this.sessionEndTime = Date.now() + 5 * 60 * 1000; // 5 phút từ bây giờ
    sessionStorage.setItem('sessionEndTime', this.sessionEndTime.toString());
  
    // Đặt thời gian chờ 5 phút để xóa session và điều hướng về trang trước đó
    this.sessionTimeout = setTimeout(() => {
      this.clearSession();
      this.router.navigate(['/movies']);
    }, 5 * 60 * 1000); // 5 phút
  
    // Điều hướng đến trang tiếp theo
    this.router.navigate(['/seat-booking']);
  }

  clearSession(): void {
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('showingrelease');
    sessionStorage.removeItem('selectedFoodCombos');
    sessionStorage.removeItem('sessionEndTime');
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
  }
}
