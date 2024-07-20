// import {
//   Component
// } from '@angular/core';
// import { MovieBookingService } from 'src/app/services/movie-booking/movie-booking.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-movie-booking',
//   templateUrl: './movie-booking.component.html',
//   styleUrls: ['./movie-booking.component.scss']
// })
// export default class MovieBookingComponent {
// [x: string]: any;

//   // cinemas: any[] = [];

//   // constructor(private movieBookingService: MovieBookingService, private router: Router) {}

//   // ngOnInit(): void {
//   //   this.movieBookingService.getCinemas().subscribe(data => {
//   //     this.cinemas = data.data.data;
//   //   });
//   // }

 
//   // selectCinema(cinema: any): void {
//   //   // Lưu cinemaId vào session storage
   
//   //   sessionStorage.setItem('selectedCinema', JSON.stringify(cinema));
//   //   // Điều hướng đến trang rooms
   
//   // }
//   // selectCinemaID(cinemaId:number): void {
//   //   sessionStorage.setItem('selectedCinemaId', cinemaId.toString());
//   //   this.router.navigate(['/rooms']);
//   //}
//   // cinemas: any[] = [];
//   // rooms: any[] = [];

//   // constructor(private movieBookingService: MovieBookingService) { }

//   // ngOnInit(): void {
//   //   this.fetchData();
//   // }

//   // fetchData(): void {
//   //   this.movieBookingService.getCinemas().subscribe(cinemaResponse => {
//   //     this.cinemas = cinemaResponse.data.data;

//   //     this.movieBookingService.getRooms().subscribe(roomResponse => {
//   //       this.rooms = roomResponse.data.data;
//   //       this.mergeCinemasAndRooms();
//   //     });
//   //   });
//   // }

//   // mergeCinemasAndRooms(): void {
//   //   this.cinemas.forEach(cinema => {
//   //     cinema.rooms = this.rooms.filter(room => room.cinema_id === cinema.id);
//   //   });
//   // }


//   cinemas: any[] = [];
//   rooms: any[] = [];
//   showingReleases: any[] = [];
//   selectedShowing: any;
//   selectedRoomId: number | null = null;
//   selectedCinemaId: number | null = null;
//   constructor(private movieBookingService: MovieBookingService) { }

//   ngOnInit(): void {
//     this.fetchData();
//   }

//   fetchData(): void {
//     this.movieBookingService.getCinemas().subscribe(cinemaResponse => {
//       this.cinemas = cinemaResponse.data.data;

//       this.movieBookingService.getRooms().subscribe(roomResponse => {
//         this.rooms = roomResponse.data.data;

//         this.movieBookingService.getShowingRelease().subscribe(showingReleaseResponse => {
//           this.showingReleases = showingReleaseResponse.data.data;
//           this.mergeData();
//         });
//       });
//     });
//   }
//   mergeData(): void {
//     // Gắn showing releases vào các rooms
//     this.rooms.forEach(room => {
//       room['showingReleases'] = this.showingReleases.filter(showing => showing.room_id === room.id);
//     });

//     // Gắn rooms vào các cinemas
//     this.cinemas.forEach(cinema => {
//       cinema['rooms'] = this.rooms.filter(room => room.cinema_id === cinema.id);
//     });
//   }
//   formatTime(dateString: string): string {
//     const date = new Date(dateString);
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   }
//   selectShowing(showing: any, roomId: number, cinemaId: number): void {
//     this.selectedShowing = showing;
//     this.selectedRoomId = roomId;
//     this.selectedCinemaId = cinemaId;

//     // Lưu thông tin đã chọn vào sessionStorage
//     sessionStorage.setItem('selectedShowing', JSON.stringify(showing));
//     sessionStorage.setItem('selectedRoomId', JSON.stringify(roomId));
//     sessionStorage.setItem('selectedCinemaId', JSON.stringify(cinemaId));

//     // Chuyển hướng đến trang chọn ghế
//     this.router.navigate(['seat-booking']);
//   }
//   }
 

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBookingService } from 'src/app/services/movie-booking/movie-booking.service';

@Component({
  selector: 'app-movie-booking',
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.scss']
})
export class MovieBookingComponent implements OnInit {

  cinemas: any[] = [];
  rooms: any[] = [];
  showingReleases: any[] = [];
  selectedShowing: any;
  selectedRoom: any;
  selectedCinema: any;

  constructor(private movieBookingService: MovieBookingService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.movieBookingService.getCinemas().subscribe(cinemaResponse => {
      this.cinemas = cinemaResponse.data.data;

      this.movieBookingService.getRooms().subscribe(roomResponse => {
        this.rooms = roomResponse.data.data;

        this.movieBookingService.getShowingRelease().subscribe(showingReleaseResponse => {
          this.showingReleases = showingReleaseResponse.data.data;
          this.mergeData();
        });
      });
    });
  }

  mergeData(): void {
    this.rooms.forEach(room => {
      room['showingReleases'] = this.showingReleases.filter(showing => showing.room_id === room.id);
    });

    this.cinemas.forEach(cinema => {
      cinema['rooms'] = this.rooms.filter(room => room.cinema_id === cinema.id);
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

  selectShowing(showing: any, room: any, cinema: any): void {
    this.selectedShowing = showing;
    this.selectedRoom = room;
    this.selectedCinema = cinema;

    // Lưu thông tin đã chọn vào sessionStorage
    sessionStorage.setItem('selectedShowing', JSON.stringify(showing));
    sessionStorage.setItem('selectedRoom', JSON.stringify(room));
    sessionStorage.setItem('selectedCinema', JSON.stringify(cinema));

    // Chuyển hướng đến trang chọn ghế
    this.router.navigate(['/seat-booking']);
  }
}
