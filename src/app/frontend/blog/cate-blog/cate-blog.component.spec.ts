import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateBlogComponent } from './cate-blog.component';

describe('CateBlogComponent', () => {
  let component: CateBlogComponent;
  let fixture: ComponentFixture<CateBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
