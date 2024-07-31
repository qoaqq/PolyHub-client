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
  showingRelease: any[] = [];
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];
  movieId: string | null = null;
  private sessionTimeout: any;
  private sessionEndTime: number = 0;

  groupedShowings: { [key: string]: any[] } = {};
  showingDates: string[] = [];


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
    this.movieBookingService.getShowingReleasebyMovieId(this.movieId).subscribe(response => {
      const showings = response.data;
      console.log(showings);
  
      // Group showings by date_release
      this.groupedShowings = showings.reduce((acc: any, showing: any) => {
        const date = showing.date_release;
  
        if (!acc[date]) {
          acc[date] = [];
        }
        // Chuyển đổi time_release nếu cần thiết
      // Nếu time_release không phải là mảng, bạn cần phải xử lý trường hợp này
      if (typeof showing.time_release === 'string') {
        showing.time_release = [showing.time_release]; // Đổi thành mảng nếu cần thiết
      }

      // Đảm bảo time_release là mảng
      showing.time_release = showing.time_release.map((time: string) => new Date(time));
        acc[date].push(showing);
        return acc;
      }, {} as { [key: string]: any[] });
  
      // Optionally, you can convert the grouped data into an array for easier iteration in the view
      this.showingDates = Object.keys(this.groupedShowings);
    });
  }

  mergeData(): void {
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
