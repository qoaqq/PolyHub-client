import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetaiComponent } from './bill-detai.component';

describe('BillDetaiComponent', () => {
  let component: BillDetaiComponent;
  let fixture: ComponentFixture<BillDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
