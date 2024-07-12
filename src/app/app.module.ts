import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { SilderVideoComponent } from './frontend/home/components/silder-video/silder-video.component';
import { TopMovieComponent } from './frontend/home/components/top-movie/top-movie.component';
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
  ],
  imports: [BrowserModule, AppRoutingModule,  HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
