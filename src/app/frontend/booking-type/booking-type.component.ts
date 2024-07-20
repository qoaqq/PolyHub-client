import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { SeatBookingService } from 'src/app/services/seat-booking/seat-booking.service';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss'],
})
export class BookingTypeComponent implements OnInit, OnDestroy {
  selectedCinema: any;
  selectedRoom: any;
  selectedShowingRelease: any;
  selectedSeats: number[] = [];
  private sessionTimeout: any;
  private readonly SESSION_DURATION = 3 * 60 * 1000; // 3 minutes

  constructor(private router: Router, private seatBookingService: SeatBookingService) {}

  ngOnInit(): void {
    const cinema = sessionStorage.getItem('selectedCinema');
    const room = sessionStorage.getItem('selectedRoom');
    const showingRelease = sessionStorage.getItem('selectedShowing');
    const seats = sessionStorage.getItem('selectedSeats');

    if (cinema) {
      this.selectedCinema = JSON.parse(cinema);
    }

    if (room) {
      this.selectedRoom = JSON.parse(room);
    }

    if (showingRelease) {
      this.selectedShowingRelease = JSON.parse(showingRelease);
      console.log(this.selectedShowingRelease);
    }

    if (seats) {
      this.selectedSeats = JSON.parse(seats);
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

  confirmBooking(): void {
    clearTimeout(this.sessionTimeout); // Clear the timeout when booking is confirmed
    // Add logic to confirm the booking here
    // For example, you can call a service to save the booking information
    alert('Booking confirmed!'); // Temporary placeholder for booking confirmation logic
    this.router.navigate(['/confirmation']); // Navigate to a confirmation page or similar
  }
 // clearSessionAndRedirect(): void {
  //   sessionStorage.removeItem('selectedSeats');

  //   alert('Session has expired. You will be redirected to the seat selection page.');
  //   this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
  // }
  clearSessionAndRedirect(): void {
    // Ensure selectedSeats is not empty
    if (this.selectedSeats.length > 0) {
      // Update the status of each selected seat
      const seatUpdateRequests = this.selectedSeats.map(seatId => {
        // Set newStatus to false
        const newStatus = false;
        return this.seatBookingService.updateSeatStatus(this.selectedShowingRelease.id, seatId, newStatus).toPromise();
      });

      Promise.all(seatUpdateRequests).then(() => {
        // On successful update of all seats, clear the session and redirect
        sessionStorage.removeItem('selectedSeats');
        alert('Session has expired. You will be redirected to the seat selection page.');
        this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
      }).catch(error => {
        // Handle any errors during seat status update
        console.error('Error updating seat status:', error);
        alert('Failed to update seat status. Please try again.');
      });
    } else {
      // If there are no selected seats, just clear the session and redirect
      sessionStorage.removeItem('selectedSeats');
      alert('Session has expired. You will be redirected to the seat selection page.');
      this.router.navigate(['/seat-booking']); // Navigate back to seat selection page
    }
  }
}
