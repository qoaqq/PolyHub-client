import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadStartComponent } from './preload-start.component';

describe('PreloadStartComponent', () => {
  let component: PreloadStartComponent;
  let fixture: ComponentFixture<PreloadStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloadStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloadStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
