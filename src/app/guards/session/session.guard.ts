import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const showingRelease = sessionStorage.getItem('showingRelease');
    const selectedFoodCombos = sessionStorage.getItem('selectedFoodCombos');
    const selectedSeats = sessionStorage.getItem('selectedSeats');

    if (showingRelease && selectedFoodCombos && selectedSeats) {
      return true;
    } else {
      this.router.navigate(['/movies']);
      alert('Please choose a movie and book tickets')
      return false;
    }
  }
}
