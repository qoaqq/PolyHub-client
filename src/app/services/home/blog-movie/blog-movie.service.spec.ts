import { TestBed } from '@angular/core/testing';

import { BlogMovieService } from './blog-movie.service';

describe('BlogMovieService', () => {
  let service: BlogMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
