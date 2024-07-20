import { TestBed } from '@angular/core/testing';

import { BookingTypeService } from './booking-type.service';

describe('BookingTypeService', () => {
  let service: BookingTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

