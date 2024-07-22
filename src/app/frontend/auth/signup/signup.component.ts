import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  repassword: string = '';
  phonenumber: string = '';
  date_of_birth: string = '';
  gender: string = '';
  errors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/user']);
    }
  }

  onSubmit() {
    this.authService
      .signup(
        this.name,
        this.email,
        this.password,
        this.repassword,
        this.phonenumber,
        this.date_of_birth,
        this.gender
      )
      .subscribe(
        (success) => {
          // Redirect to home page or another page upon successful signup
          this.router.navigate(['/signin']);
        },
        (errors) => {
          this.errors = errors;
        }
      );
  }
}
