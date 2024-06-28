import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateMovieComponent } from './cate-movie.component';

describe('CateMovieComponent', () => {
  let component: CateMovieComponent;
  let fixture: ComponentFixture<CateMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
