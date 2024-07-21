import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelesedMovieComponent } from './relesed-movie.component';

describe('RelesedMovieComponent', () => {
  let component: RelesedMovieComponent;
  let fixture: ComponentFixture<RelesedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelesedMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelesedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
