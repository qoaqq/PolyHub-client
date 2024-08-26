import { Component } from '@angular/core';
import { UserBillService } from 'src/app/services/user-bill/user-bill.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-bill-detai',
  templateUrl: './bill-detai.component.html',
  styleUrls: ['./bill-detai.component.scss']
})
export class BillDetaiComponent {
  bill: any;
  error: string | null = null;
  billId: string | null = null;
  constructor(private userbillService: UserBillService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.billId = this.route.snapshot.paramMap.get('id');
    
    this.userbillService.getBillDetail(this.billId).subscribe(
      data => {
        // Handle the data directly here
        this.bill = data.data;
        console.log(this.bill);
        
      },
      error => {
        // Handle errors here
        this.error = 'Error fetching bills';
      }
    );
  }
}
