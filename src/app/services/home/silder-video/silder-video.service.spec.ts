import { TestBed } from '@angular/core/testing';

import { SilderVideoService } from './silder-video.service';

describe('SilderVideoService', () => {
  let service: SilderVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilderVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
