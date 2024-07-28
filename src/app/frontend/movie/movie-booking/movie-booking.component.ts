import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,NavigationStart} from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking/movie-booking.service';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { forkJoin  } from 'rxjs';
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
  private sessionEndTime: number = 0;

  constructor(
    private seatBookingService: SeatBookingService, 
    private movieBookingService: MovieBookingService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
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
  // Gọi API và lưu dữ liệu đồng thời
  forkJoin([
    this.seatBookingService.getShowingRelease(showing.id),
  ]).subscribe(
    ([showingReleaseData]) => {
      sessionStorage.setItem('showingRelease', JSON.stringify(showingReleaseData.data));
      sessionStorage.setItem('selectedFoodCombos', JSON.stringify(this.selectedFoodCombos));
      sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));

      
      // Điều hướng đến trang tiếp theo
      this.router.navigate(['/seat-booking']);
    },
    (error) => {
      console.error('Error fetching data:', error); // Xử lý lỗi
    }
  );

}
}
