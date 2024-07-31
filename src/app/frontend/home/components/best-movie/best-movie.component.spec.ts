import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMovieComponent } from './best-movie.component';

describe('BestMovieComponent', () => {
  let component: BestMovieComponent;
  let fixture: ComponentFixture<BestMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
