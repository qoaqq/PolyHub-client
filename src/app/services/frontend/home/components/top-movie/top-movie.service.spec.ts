import { TestBed } from '@angular/core/testing';

import { TopMovieService } from './top-movie.service';

describe('TopMovieService', () => {
  let service: TopMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
