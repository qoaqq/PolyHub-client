import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

@Component({
  selector: 'app-food-combo',
  templateUrl: './food-combo.component.html',
  styleUrls: ['./food-combo.component.scss']
})
export class FoodComboComponent implements OnInit {
  foodCombos: any[] = [];
  selectedSeats: any[] = [];

  constructor(
    private foodComboService: FoodComboService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.loadFoodCombos();
  }

  loadFoodCombos(): void {
    this.foodComboService.getFoodCombos().subscribe(
      (data) => {
        this.foodCombos = data.data.data;
        console.log('Food Combos:', this.foodCombos);
      },
      (error) => {
        console.error('Error fetching food combos:', error);
      }
    );
}
}
