import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss'],
})
export class BookingTypeComponent implements OnInit {
  combo: any;
  paymentForm: FormGroup;
  selectedSeats: any[] = [];
  selectedFoodCombos: any[] = [];
  totalCost: number = 0;
  movie: any;
  seatCost: any;
  private sessionTimeout: any;
  private readonly SESSION_DURATION = 3 * 60 * 1000; // 3 minutes

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seatBookingService: SeatBookingService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: [''],
      totalCost:[]
    });
  }

  ngOnInit(): void {
    const cinema = sessionStorage.getItem('selectedCinema');
    const room = sessionStorage.getItem('selectedRoom');
    const showingRelease = sessionStorage.getItem('selectedShowing');
    const seats = sessionStorage.getItem('selectedSeats');
    const foodCombos = sessionStorage.getItem('selectedFoodCombos');
    const cost = sessionStorage.getItem('totalCost');
    console.log('GIA: ' + cost);

    const movieData = sessionStorage.getItem('movie');
    const totalSeatCost = sessionStorage.getItem('totalSeatCost');
    if (totalSeatCost) {
      this.seatCost = JSON.parse(totalSeatCost);
      console.log(this.seatCost);
    }
    if (movieData) {
      this.movie = JSON.parse(movieData);
      console.log(this.movie);
    }
    if (cinema) {
      this.selectedCinema = JSON.parse(cinema);
    }

    if (room) {
      this.selectedRoom = JSON.parse(room);
    }

    if (showingRelease) {
      this.showingrelease = JSON.parse(showingRelease);
      console.log(this.showingrelease);
    }
  }

  loadTicketSeats(): void {
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    if (selectedSeats) {
      this.selectedSeats = JSON.parse(selectedSeats);
      console.log(this.selectedSeats);
    }
  }

  loadFoodCombos(): void {
    const selectedFoodCombos = sessionStorage.getItem('selectedFoodCombos');
    if (selectedFoodCombos) {
      this.selectedFoodCombos = JSON.parse(selectedFoodCombos);
      console.log(this.selectedFoodCombos);
    }
    if (cost) {
      this.totalCost = Number(JSON.parse(cost)); // Add this line
      console.log('total: ', this.totalCost);
    }
    // Set a timeout to clear the session after the defined duration
    this.sessionTimeout = setTimeout(() => {
      this.clearSessionAndRedirect();
    }, this.SESSION_DURATION);
  }

  ngOnDestroy(): void {
    clearTimeout(this.sessionTimeout);
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calculateTotalPriceTicket() {
    this.totalPriceTicketSeat = 0;
    this.selectedSeats.forEach(seat => {
      // Chuyển chuỗi thành số và loại bỏ các dấu phân cách hàng ngàn
      const price = parseFloat((seat.seat.seat_type.price as string).replace(/,/g, ''));
      this.totalPriceTicketSeat += price;
    });
    this.updateGrandTotal(); // Cập nhật tổng khi giá vé đã được tính
  }

  calculateTotalPriceFoodCombo(): void {
    this.totalPriceFoodCombo = 0;
    this.selectedFoodCombos.forEach(combo => {
      const price = parseFloat((combo.price as string).replace(/,/g, ''));
      this.totalPriceFoodCombo += price * combo.quantity;
    });
    this.updateGrandTotal(); // Cập nhật tổng khi giá food combo đã được tính
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
  // sendData() {
  //   const storedValue = sessionStorage.getItem('totalCost');
  //   console.log("them thanh cong:", storedValue);
  //   return this.http.post(this.apiUrl, { storedValue });
  // }
  onSubmit() {
    const formValue = this.paymentForm.value;
    formValue.total = this.totalCost; // Thêm totalCost vào formValue
    console.log(formValue);
    this.http.post('http://localhost:8000/api/payment/', formValue).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response.redirect_url) {
          window.location.href = response.redirect_url;
        } else {
          console.log('Payment response:', response);
        }
      },
      (error) => {
        console.error('Error:', error);
        console.log('Error Details:', error.error);
      }
    );
  }

  confirmBooking(): void {
    clearTimeout(this.sessionTimeout); // Clear the timeout when booking is confirmed
    // Add logic to confirm the booking here
    // For example, you can call a service to save the booking information
    // Temporary placeholder for booking confirmation logic
    //this.router.navigate(['/payment-method']); // Navigate to a confirmation page or similar
  }

  // clearSessionAndRedirect(): void {
  //   sessionStorage.removeItem('selectedSeats');

  //   alert('Session has expired. You will be redirected to the seat selection page.');
  //   this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
  // }

  // clearSessionAndRedirect(): void {
  //   // Ensure selectedSeats is not empty
  //   if (this.selectedSeats.length > 0) {
  //     // Update the status of each selected seat
  //     const seatUpdateRequests = this.selectedSeats.map((seatId) => {
  //       // Set newStatus to false
  //       const newStatus = false;
  //       return this.seatBookingService
  //         .updateSeatStatus(this.selectedShowingRelease.id, seatId, newStatus)
  //         .toPromise();
  //     });

  //     Promise.all(seatUpdateRequests)
  //       .then(() => {
  //         // On successful update of all seats, clear the session and redirect
  //         sessionStorage.removeItem('selectedSeats');
  //         alert(
  //           'Session has expired. You will be redirected to the seat selection page.'
  //         );
  //         this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
  //       })
  //       .catch((error) => {
  //         // Handle any errors during seat status update
  //         console.error('Error updating seat status:', error);
  //         alert('Failed to update seat status. Please try again.');
  //       });
  //   } else {
  //     // If there are no selected seats, just clear the session and redirect
  //     sessionStorage.removeItem('selectedSeats');
  //     alert(
  //       'Session has expired. You will be redirected to the seat selection page.'
  //     );
  //     this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
  //   }
  // }

  clearSessionAndRedirect(): void {
    // Ensure selectedSeats is not empty
    if (this.selectedSeats.length > 0) {
      // Update the status of each selected seat
      const seatUpdateRequests = this.selectedSeats.map(
        (seat: { id: number }) => {
          // Set newStatus to false
          const newStatus = false;
          return this.seatBookingService
            .updateSeatStatus(
              this.selectedShowingRelease.id,
              seat.id,
              newStatus
            )
            .toPromise();
        }
      );

      Promise.all(seatUpdateRequests)
        .then(() => {
          // On successful update of all seats, clear the session and redirect
          sessionStorage.removeItem('selectedSeats');
          sessionStorage.removeItem('totalSeatCost'); // Remove seat cost from session
          sessionStorage.removeItem('selectedFoodCombos'); // Remove food combos from session
          sessionStorage.removeItem('totalFoodComboCost'); // Remove food combo cost from session
          sessionStorage.removeItem('totalCost'); // Remove total cost from session

          alert(
            'Session has expired. You will be redirected to the seat selection page.'
          );
          this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
        })
        .catch((error) => {
          // Handle any errors during seat status update
          console.error('Error updating seat status:', error);
          alert('Failed to update seat status. Please try again.');
        });
    } else {
      // If there are no selected seats, just clear the session and redirect
      sessionStorage.removeItem('selectedSeats');
      sessionStorage.removeItem('totalSeatCost'); // Remove seat cost from session
      sessionStorage.removeItem('selectedFoodCombos'); // Remove food combos from session
      sessionStorage.removeItem('totalFoodComboCost'); // Remove food combo cost from session
      sessionStorage.removeItem('totalCost'); // Remove total cost from session

      alert(
        'Session has expired. You will be redirected to the seat selection page.'
      );
      this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
    }
  }
}
