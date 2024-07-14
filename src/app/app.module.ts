import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './frontend/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreloadStartComponent } from './components/preload-start/preload-start.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
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
import { AuthService } from './services/auth/auth.service';
import { UserComponent } from './frontend/user/user.component';
import { SignoutComponent } from './frontend/auth/signout/signout.component';
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
    SigninComponent,
    SignupComponent,
    UserComponent,
    SignoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
