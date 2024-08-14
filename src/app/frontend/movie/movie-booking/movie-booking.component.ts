  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute ,NavigationStart} from '@angular/router';
  import { MovieBookingService } from 'src/app/services/movie-booking/movie-booking.service';
  import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
  import { forkJoin  } from 'rxjs';
  import { formatDate } from '@angular/common';


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

  groupedShowings: { 
    [key: string]: { 
      city: string, 
      cinemas: { 
        [cinemaName: string]: { 
          name: string, 
          showings: any[] 
        } 
      } 
    } 
  } = {};
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
      const today = new Date();
      const tenDaysLater = new Date();
      tenDaysLater.setDate(today.getDate() + 10);

      // Tạo một mảng các ngày trong vòng 10 ngày tới
      this.showingDates = [];
      for (let d = new Date(today); d <= tenDaysLater; d.setDate(d.getDate() + 1)) {
          this.showingDates.push(formatDate(d, 'yyyy-MM-dd', 'en-US'));
      }

      // Lấy dữ liệu từ API
      this.movieBookingService.getShowingReleasebyMovieId(this.movieId).subscribe(response => {
          const showings = response.data;
          console.log(showings);

          // Nhóm dữ liệu theo date_release, city.name, và cinema.name
          this.groupedShowings = showings.reduce((acc: any, showing: any) => {
              const formattedDate = formatDate(new Date(showing.date_release), 'yyyy-MM-dd', 'en-US');
              const cityName = showing.room.cinema.city.name;
              const cinemaName = showing.room.cinema.name;

              // Tạo key kết hợp giữa date_release và city.name
              const key = `${formattedDate}-${cityName}`;

              if (!acc[key]) {
                  acc[key] = {
                      city: cityName,
                      cinemas: {}
                  };
              }

              if (!acc[key].cinemas[cinemaName]) {
                  acc[key].cinemas[cinemaName] = {
                      name: cinemaName,
                      showings: []
                  };
              }

              // Kiểm tra và chuyển đổi time_release thành mảng các đối tượng Date
              showing.time_release = (typeof showing.time_release === 'string' ? [showing.time_release] : showing.time_release)
                  .map((time: string) => new Date(time));

              // Đưa dữ liệu vào nhóm theo date_release, city.name, và cinema.name
              acc[key].cinemas[cinemaName].showings.push(showing);
              return acc;
          }, {} as { [key: string]: { city: string, cinemas: { [cinemaName: string]: { name: string, showings: any[] } } } });

          // Đảm bảo tất cả các ngày trong khoảng thời gian đều có dữ liệu
          this.showingDates.forEach(date => {
              const dateCityKeys = Object.keys(this.groupedShowings).filter(key => key.startsWith(date));
              if (dateCityKeys.length === 0) {
                  this.groupedShowings[`${date}-No City`] = { city: 'No City', cinemas: {} };
              }
          });
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
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  }
