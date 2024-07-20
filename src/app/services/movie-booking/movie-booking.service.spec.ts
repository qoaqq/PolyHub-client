import { TestBed } from '@angular/core/testing';

import { MovieBookingService } from './movie-booking.service';

describe('MovieBookingService', () => {
  let service: MovieBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
