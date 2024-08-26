import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBillComponent } from './user-bill.component';

describe('UserBillComponent', () => {
  let component: UserBillComponent;
  let fixture: ComponentFixture<UserBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
