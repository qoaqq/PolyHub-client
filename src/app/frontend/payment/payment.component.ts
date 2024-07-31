import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      subtotal: [0],
      paymentMethod: [''],
    });
  }

  // onSubmit() {
  //   const formValue = this.paymentForm.value;
  //   this.http.post('http://localhost:8000/api/bill', formValue).subscribe(
  //     (response: any) => {
  //       console.log('API Response:', response);
  //       if (response.redirect_url) {
  //         window.location.href = response.redirect_url;
  //       } else {
  //         console.log('Payment response:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       console.log('Error Details:', error.error);
  //     }
  //   );
  // }
  onSubmit() {
    const formValue = this.paymentForm.value;
    this.http.post('http://localhost:8000/api/bill', formValue).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response.redirect_url) {    
          window.location.href = response.redirect_url;
        } else {
          console.log('Payment response:', response);
        }
      },
      (error) => {
        console.error('Error:', error);
        console.log('Error Details:', error.error);
      }
    );
  }
}
