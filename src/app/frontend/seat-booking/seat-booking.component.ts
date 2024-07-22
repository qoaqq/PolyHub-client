// import { Component, OnInit } from '@angular/core';
// import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-seat-booking',
//   templateUrl: './seat-booking.component.html',
//   styleUrls: ['./seat-booking.component.scss']
// })
// export class SeatBookingComponent implements OnInit {

//   seats: any[] = [];
//   showingId: any;
//   selectedSeats: Set<number> = new Set();
//   selectedSeatCount: number = 0;
//   constructor(private seatBookingService: SeatBookingService, private router: Router) { }

//   ngOnInit(): void {
//     this.loadShowingId();
//     if (this.showingId !== null) {
//       this.loadSeats();
//     }
//     this.loadSelectedSeats();
//   }

//   loadShowingId(): void {
//     // Lấy ID của showing từ sessionStorage
//     const showingId = sessionStorage.getItem('selectedShowing');
//     if (showingId) {
//       this.showingId = JSON.parse(showingId);
//       console.log(this.showingId);
//     }
//   }

//   loadSeats(): void {
//     if (this.showingId !== null) {
//       this.seatBookingService.getSeats(this.showingId.id).subscribe(
//         (data) => {
//           this.seats = data;
//           console.log('Seats:', this.seats); // Hiển thị dữ liệu ghế trong console
//         },
//         (error) => {
//           console.error('Error fetching seats:', error); // Xử lý lỗi
//         }
//       );
//     }
//   }

//   loadSelectedSeats(): void {
//     // Tải thông tin ghế đã chọn từ sessionStorage nếu có
//     const storedSeats = sessionStorage.getItem('selectedSeats');
//     if (storedSeats) {
//       this.selectedSeats = new Set(JSON.parse(storedSeats));
//     }
//   }

//   isSelected(seatId: number): boolean {
//     return this.selectedSeats.has(seatId);
//   }

//   // onSeatChange(seatId: number): void {
//   //   if (this.selectedSeats.has(seatId)) {
//   //     this.selectedSeats.delete(seatId);
//   //   } else {
//   //     this.selectedSeats.add(seatId);
//   //   }
//   //   // Lưu thông tin ghế đã chọn vào sessionStorage
//   //   sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(this.selectedSeats)));

//   // }
//   onSeatChange(seatId: number): void {
//     // Determine if the seat is currently selected
//     const isSelected = this.selectedSeats.has(seatId);
//     const newStatus = !isSelected; // Toggle status for the seat
  
//     console.log(`Toggling seat ${seatId}. Current selected: ${isSelected}. New status: ${newStatus}`);
  
//     // Update seat status on the server
//     this.seatBookingService.updateSeatStatus(this.showingId.id, seatId, newStatus).subscribe(
//       (response) => {
//         console.log(`Server response:`, response); // Log server response
  
//         // On success, update the selectedSeats Set
//         if (isSelected) {
//           this.selectedSeats.delete(seatId); // Remove seat if previously selected
//         } else {
//           this.selectedSeats.add(seatId); // Add seat if not previously selected
//         }
  
//         // Save updated selection to sessionStorage
//         sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(this.selectedSeats)));
//         this.updateSelectedSeatCount();
//       },
//       (error) => {
//         console.error('Error updating seat status:', error);
  
//         // Optionally, show a user-friendly message or revert changes if necessary
//         // this.showErrorMessage('Failed to update seat status. Please try again.');
//       }
//     );
//   }
//   updateSelectedSeatCount(): void {
//     this.selectedSeatCount = this.selectedSeats.size;
//   }
  

//   confirmSelection(): void {
//     // Điều hướng đến trang tóm tắt
//     this.router.navigate(['/booking-type']);
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-seat-booking',
//   templateUrl: './seat-booking.component.html',
//   styleUrls: ['./seat-booking.component.scss']
// })
// export class SeatBookingComponent implements OnInit {

//   seats: any[] = [];
//   showingId: any;
//   selectedSeats: Set<number> = new Set();
//   selectedSeatCount: number = 0;
//   totalSeatCost: number = 0;
//   seatPrices: { [type: number]: number } = { 1: 50000, 2: 70000, 3: 100000 };
//   rows: any[][] = [];

//   // Define seat prices
  
//   constructor(private seatBookingService: SeatBookingService, private router: Router) { }

//   ngOnInit(): void {
//     this.loadShowingId();
//     if (this.showingId !== null) {
//       this.loadSeats();
//     }
//     this.loadSelectedSeats();
//     this.calculateTotalSeatCost();
//   }

//   loadShowingId(): void {
//     const showingId = sessionStorage.getItem('selectedShowing');
//     if (showingId) {
//       this.showingId = JSON.parse(showingId);
//       console.log(this.showingId);
//     }
//   }

//   loadSeats(): void {
//     if (this.showingId !== null) {
//       this.seatBookingService.getSeats(this.showingId.id).subscribe(
//         (data) => {
//           this.seats = data;
//           // Sort seats by type and then by row and column
//           this.seats.sort((a, b) => {
//             if (a.seat.type !== b.seat.type) {
//               return a.seat.type - b.seat.type;
//             }
//             if (a.seat.row !== b.seat.row) {
//               return a.seat.row - b.seat.row;
//             }
//             return a.seat.column - b.seat.column;
//           });
//           this.createRows();
//           console.log('Seats:', this.seats);
//         },
//         (error) => {
//           console.error('Error fetching seats:', error);
//         }
//       );
//     }
//   }

//   createRows(): void {
//     const seatsPerRow = Math.ceil(this.seats.length / 7);
//     this.rows = [];
//     for (let i = 0; i < 7; i++) {
//       this.rows.push(this.seats.slice(i * seatsPerRow, (i + 1) * seatsPerRow));
//     }
//   }

//   loadSelectedSeats(): void {
//     const storedSeats = sessionStorage.getItem('selectedSeats');
//     if (storedSeats) {
//       this.selectedSeats = new Set(JSON.parse(storedSeats));
//       this.calculateTotalSeatCost();
//     }
//   }

//   isSelected(seatId: number): boolean {
//     return this.selectedSeats.has(seatId);
//   }

//   onSeatChange(seat: any): void {
//     const isSelected = this.selectedSeats.has(seat.id);
//     const newStatus = !isSelected;

//     console.log(`Toggling seat ${seat.id}. Current selected: ${isSelected}. New status: ${newStatus}`);

//     this.seatBookingService.updateSeatStatus(this.showingId.id, seat.id, newStatus).subscribe(
//       (response) => {
//         console.log(`Server response:`, response);

//         if (isSelected) {
//           this.selectedSeats.delete(seat);
//         } else {
//           this.selectedSeats.add(seat);
//           console.log(this.selectedSeats);
//         }

//         sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(this.selectedSeats)));
//         this.calculateTotalSeatCost();
//         this.updateSelectedSeatCount();
//       },
//       (error) => {
//         console.error('Error updating seat status:', error);
//       }
//     );
//   }
//   calculateTotalSeatCost(): void {
//     this.totalSeatCost = Array.from(this.selectedSeats).reduce((total, seatId) => {
//       const seat = this.seats.find(s => s.seat.id === seatId);
     
//       if (seat) {
//         return total + (this.seatPrices[seat.seat.type] || 0);
        
//       }
//       return total;
//     }, 0);
//     sessionStorage.setItem('totalSeatCost', JSON.stringify(this.totalSeatCost));
//     console.log('Total seat cost:', this.totalSeatCost);
//   }

//   updateSelectedSeatCount(): void {
//     this.selectedSeatCount = this.selectedSeats.size;
//   }

//   confirmSelection(): void {
//     this.router.navigate(['/food-combo']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent implements OnInit {

  seats: any[] = [];
  showingId: any;
  selectedSeats: Set<number> = new Set();
  selectedSeatCount: number = 0;
  totalSeatCost: number = 0;
  seatPrice: number = 50000;  // Giá ghế cố định là 50,000
  rows: any[][] = [];
  movie: any;
  showing: any;
  constructor(private seatBookingService: SeatBookingService, private router: Router) { }

  ngOnInit(): void {
    this.loadShowingId();
    if (this.showingId !== null) {
      this.loadSeats();
    }
    this.loadSelectedSeats();
    this.calculateTotalSeatCost();
    const movieData = sessionStorage.getItem('movie');
    if (movieData) {
      this.movie = JSON.parse(movieData);
    }
    const showingRelease = sessionStorage.getItem('selectedShowing');
    if (showingRelease) {
      this.showing = JSON.parse(showingRelease);
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
  loadShowingId(): void {
    const showingId = sessionStorage.getItem('selectedShowing');
    if (showingId) {
      this.showingId = JSON.parse(showingId);
    }
  }

  loadSeats(): void {
    if (this.showingId !== null) {
      this.seatBookingService.getSeats(this.showingId.id).subscribe(
        (data) => {
          this.seats = data;
          this.seats.sort((a, b) => {
            if (a.seat.row !== b.seat.row) {
              return a.seat.row - b.seat.row;
            }
            return a.seat.column - b.seat.column;
          });
          this.createRows();
        },
        (error) => {
          console.error('Error fetching seats:', error);
        }
      );
    }
  }

  createRows(): void {
    const seatsPerRow = Math.ceil(this.seats.length / 7);
    this.rows = [];
    for (let i = 0; i < 7; i++) {
      this.rows.push(this.seats.slice(i * seatsPerRow, (i + 1) * seatsPerRow));
    }
  }

  loadSelectedSeats(): void {
    const storedSeats = sessionStorage.getItem('selectedSeats');
    if (storedSeats) {
      this.selectedSeats = new Set(JSON.parse(storedSeats));
      this.calculateTotalSeatCost();
    }
  }

  isSelected(seatId: number): boolean {
    return this.selectedSeats.has(seatId);
  }

  onSeatChange(seat: any): void {
        const isSelected = this.selectedSeats.has(seat.id);
        const newStatus = !isSelected;
    
        console.log(`Toggling seat ${seat.id}. Current selected: ${isSelected}. New status: ${newStatus}`);
    
        this.seatBookingService.updateSeatStatus(this.showingId.id, seat.id, newStatus).subscribe(
          (response) => {
            console.log(`Server response:`, response);
    
            if (isSelected) {
              this.selectedSeats.delete(seat);
            } else {
              this.selectedSeats.add(seat);
              console.log(this.selectedSeats);
            }
    
            sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(this.selectedSeats)));
            this.calculateTotalSeatCost();
            this.updateSelectedSeatCount();
          },
          (error) => {
            console.error('Error updating seat status:', error);
          }
        );
      }

  calculateTotalSeatCost(): void {
    this.totalSeatCost = this.selectedSeats.size * this.seatPrice;
    console.log('Total seat cost:', this.totalSeatCost);
    sessionStorage.setItem('totalSeatCost', JSON.stringify(this.totalSeatCost));
  }
  updateSelectedSeatCount(): void {
         this.selectedSeatCount = this.selectedSeats.size;
       }

  confirmSelection(): void {
    this.router.navigate(['/food-combo']);
  }
}



