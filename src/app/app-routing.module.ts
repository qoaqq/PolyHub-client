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
import { SigninComponent } from './frontend/auth/signin/signin.component';
import { SignupComponent } from './frontend/auth/signup/signup.component';
import { UserComponent } from './frontend/user/user.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { SessionGuard } from './guards/session/session.guard';
import { AuthUserGuard } from './guards/user/auth-user.guard';
import { FoodComboComponent } from './frontend/food-combo/food-combo.component';
import { PaymentComponent } from './frontend/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bill', component: BookingTypeComponent ,canActivate: [AuthUserGuard,SessionGuard]},
  { path: 'seat-booking', component: SeatBookingComponent ,canActivate: [AuthUserGuard,SessionGuard]},
  { path: 'movie-booking/:id', component: MovieBookingComponent},
  { path: 'booking-type', component: BookingTypeComponent,canActivate: [AuthUserGuard,SessionGuard] },
  { path: 'confirmation', component: ConfirmationComponent,canActivate: [AuthUserGuard,SessionGuard] },
  { path: 'movies', component: CateMovieComponent },
  { path: 'movie/:id', component: SingleMovieComponent },
  { path: 'blogs', component: CateBlogComponent },
  { path: 'blog/:id', component: SingleBlogComponent },
  { path: 'food-combo', component: FoodComboComponent ,canActivate: [AuthUserGuard,SessionGuard]},
  { path: 'payment-method', component: PaymentComponent ,canActivate: [AuthUserGuard,SessionGuard]},
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard]  },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]  },
  { path: 'user', component: UserComponent , canActivate: [AuthUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
