import { TestBed } from '@angular/core/testing';

import { UserBillService } from './user-bill.service';

describe('UserBillService', () => {
  let service: UserBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
