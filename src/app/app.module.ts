import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './frontend/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloadStartComponent } from './components/preload-start/preload-start.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { BookingTypeComponent } from './frontend/booking-type/booking-type.component';
import { SeatBookingComponent } from './frontend/seat-booking/seat-booking.component';
import {MovieBookingComponent} from './frontend/movie/movie-booking/movie-booking.component';
import { ConfirmationComponent } from './frontend/confirmation/confirmation.component';
import { CateMovieComponent } from './frontend/movie/cate-movie/cate-movie.component';
import { SingleMovieComponent } from './frontend/movie/single-movie/single-movie.component';
import { CateBlogComponent } from './frontend/blog/cate-blog/cate-blog.component';
import { SingleBlogComponent } from './frontend/blog/single-blog/single-blog.component';
import { SilderVideoComponent } from './frontend/home/components/silder-video/silder-video.component';
import { TopMovieComponent } from './frontend/home/components/top-movie/top-movie.component';
import { RelesedMovieComponent } from './frontend/home/components/relesed-movie/relesed-movie.component';
import { UpcomingMovieComponent } from './frontend/home/components/upcoming-movie/upcoming-movie.component';
import { BlogMovieComponent } from './frontend/home/components/blog-movie/blog-movie.component';
import { SigninComponent } from './frontend/auth/signin/signin.component';
import { SignupComponent } from './frontend/auth/signup/signup.component';
import { AuthService } from './services/auth/auth.service';
import { UserComponent } from './frontend/user/user.component';
import { SliderComponent } from './frontend/home/components/slider/slider.component';
import { PaymentComponent } from './frontend/payment/payment.component';
import { FoodComboComponent } from './frontend/food-combo/food-combo.component';
import { SessionTimerComponent } from './components/session-timer/session-timer.component';
import { BestMovieComponent } from './frontend/home/components/best-movie/best-movie.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PreloadStartComponent,
    NewsletterComponent,
    BookingTypeComponent,
    SeatBookingComponent,
    MovieBookingComponent,
    ConfirmationComponent,
    CateMovieComponent,
    SingleMovieComponent,
    CateBlogComponent,
    SingleBlogComponent,
    SilderVideoComponent,
    TopMovieComponent,
    RelesedMovieComponent,
    UpcomingMovieComponent,
    BlogMovieComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,
    SliderComponent,
    PaymentComponent,
    FoodComboComponent,
    SessionTimerComponent,
    BestMovieComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}