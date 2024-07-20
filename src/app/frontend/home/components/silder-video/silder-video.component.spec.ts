import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilderVideoComponent } from './silder-video.component';

describe('SilderVideoComponent', () => {
  let component: SilderVideoComponent;
  let fixture: ComponentFixture<SilderVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilderVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilderVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
