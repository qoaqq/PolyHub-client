import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './frontend/home/home.component';
import { BookingTypeComponent } from './frontend/booking-type/booking-type.component';
import { SeatBookingComponent } from './frontend/seat-booking/seat-booking.component';
import { MovieBookingComponent } from './frontend/movie/movie-booking/movie-booking.component';
import { ConfirmationComponent } from './frontend/confirmation/confirmation.component';
import { CateMovieComponent } from './frontend/movie/cate-movie/cate-movie.component';
import { SingleMovieComponent } from './frontend/movie/single-movie/single-movie.component';
import { CateBlogComponent } from './frontend/blog/cate-blog/cate-blog.component';
import { SingleBlogComponent } from './frontend/blog/single-blog/single-blog.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'payment-method', component: BookingTypeComponent },
  { path: 'seat-booking', component: SeatBookingComponent },
  { path: 'movie-booking', component: MovieBookingComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'movies', component: CateMovieComponent },
  { path: 'movie/:id', component: SingleMovieComponent },
  { path: 'blogs', component: CateBlogComponent },
  { path: 'blog', component: SingleBlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
