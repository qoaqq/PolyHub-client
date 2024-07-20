import { TestBed } from '@angular/core/testing';

import { UpcomingMovieService } from './upcoming-movie.service';

describe('UpcomingMovieService', () => {
  let service: UpcomingMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
