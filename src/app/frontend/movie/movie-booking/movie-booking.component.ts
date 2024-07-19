import {
  Component
} from '@angular/core';
import { MovieBookingService } from 'src/app/services/movie-booking/movie-booking.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-booking',
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.scss']
})
export class MovieBookingComponent {

  // cinemas: any[] = [];

  // constructor(private movieBookingService: MovieBookingService, private router: Router) {}

  // ngOnInit(): void {
  //   this.movieBookingService.getCinemas().subscribe(data => {
  //     this.cinemas = data.data.data;
  //   });
  // }

 
  // selectCinema(cinema: any): void {
  //   // Lưu cinemaId vào session storage
   
  //   sessionStorage.setItem('selectedCinema', JSON.stringify(cinema));
  //   // Điều hướng đến trang rooms
   
  // }
  // selectCinemaID(cinemaId:number): void {
  //   sessionStorage.setItem('selectedCinemaId', cinemaId.toString());
  //   this.router.navigate(['/rooms']);
  // }
  cinemas: any[] = [];
  rooms: any[] = [];

  constructor(private movieBookingService: MovieBookingService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.movieBookingService.getCinemas().subscribe(cinemaResponse => {
      this.cinemas = cinemaResponse.data.data;

      this.movieBookingService.getRooms().subscribe(roomResponse => {
        this.rooms = roomResponse.data.data;
        this.mergeCinemasAndRooms();
      });
    });
  }

  mergeCinemasAndRooms(): void {
    this.cinemas.forEach(cinema => {
      cinema.rooms = this.rooms.filter(room => room.cinema_id === cinema.id);
    });
  }

  
}
