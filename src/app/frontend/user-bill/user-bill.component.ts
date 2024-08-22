import { Component } from '@angular/core';
import { UserBillService } from 'src/app/services/user-bill/user-bill.service';
@Component({
  selector: 'app-user-bill',
  templateUrl: './user-bill.component.html',
  styleUrls: ['./user-bill.component.scss']
})
export class UserBillComponent {
  bills: any;
  error: string | null = null;

  constructor(private userbillService: UserBillService) { }

  ngOnInit(): void {
    this.userbillService.getBills().subscribe(
      data => {
        // Handle the data directly here
        this.bills = Object.values(data.data);
      },
      error => {
        // Handle errors here
        this.error = 'Error fetching bills';
      }
    );
  }
}
