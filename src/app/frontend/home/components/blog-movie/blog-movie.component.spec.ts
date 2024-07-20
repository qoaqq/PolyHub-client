import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMovieComponent } from './blog-movie.component';

describe('BlogMovieComponent', () => {
  let component: BlogMovieComponent;
  let fixture: ComponentFixture<BlogMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
