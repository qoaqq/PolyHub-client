import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodComboComponent } from './food-combo.component';

describe('FoodComboComponent', () => {
  let component: FoodComboComponent;
  let fixture: ComponentFixture<FoodComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
