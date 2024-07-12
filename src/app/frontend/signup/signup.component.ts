import {
  Component,
} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  email: string = '';
  name: string = '';
  password: string = '';
  signupFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signup(this.email, this.password, this.name).subscribe(
      success => {
        if (success) {
          alert('Sign Up Success');
          this.router.navigate(['/signin']); // Điều hướng đến trang chính sau khi đăng ký thành công
        } else {
          this.signupFailed = true;
        }
      },
      error => {
        this.signupFailed = true;
      }
    );
  }
}
