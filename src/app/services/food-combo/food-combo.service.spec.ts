import { TestBed } from '@angular/core/testing';

import { FoodComboService } from './food-combo.service';

describe('FoodComboService', () => {
  let service: FoodComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
