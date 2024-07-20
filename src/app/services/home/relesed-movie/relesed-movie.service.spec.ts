import { TestBed } from '@angular/core/testing';

import { RelesedMovieService } from './relesed-movie.service';

describe('RelesedMovieService', () => {
  let service: RelesedMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelesedMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
