import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
@Component({
  selector: 'app-food-combo',
  templateUrl: './food-combo.component.html',
  styleUrls: ['./food-combo.component.scss']
})
export class FoodComboComponent {
  foodCombos: any[] = [];
  selectedFoodCombos: Set<number> = new Set();
  totalFoodComboCost: number = 0;
  constructor(
    private foodComboService: FoodComboService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFoodCombos();
    this.loadSelectedFoodCombos();
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

  loadSelectedFoodCombos(): void {
    const storedCombos = sessionStorage.getItem('selectedFoodCombos');
    if (storedCombos) {
      this.selectedFoodCombos = new Set(JSON.parse(storedCombos));
      this.updateTotalFoodComboCost(); 
    }
  }

  isSelected(foodComboId: number): boolean {
    return this.selectedFoodCombos.has(foodComboId);
  }

  onFoodComboSelect(foodCombo: any): void {
    if (this.selectedFoodCombos.has(foodCombo)) {
      this.selectedFoodCombos.delete(foodCombo);
    } else {
      this.selectedFoodCombos.add(foodCombo);
    }
    sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos)));
  }
  updateTotalFoodComboCost(): void {
    const foodCombos = JSON.parse(sessionStorage.getItem('selectedFoodCombos') || '[]');
    this.totalFoodComboCost = foodCombos.reduce((total: number, combo: any) => total + combo.price, 0);

    // Save food combo cost to session storage
    sessionStorage.setItem('totalFoodComboCost', JSON.stringify(this.totalFoodComboCost));
  }
  // confirmSelection(): void {
  //   if (this.selectedFoodCombos.size === 0) {
  //     alert('Please select at least one food combo');
  //     return;
  //   }
  //   // Navigate to the next page or handle the selection as needed
  //   this.router.navigate(['/booking-type']); // Assuming there's a summary page
  // }
   confirmSelection(): void {
    // Calculate total cost including both seats and food combos
    const totalSeatCost = JSON.parse(sessionStorage.getItem('totalSeatCost') || '0');
    const totalFoodComboCost = this.totalFoodComboCost;
    const totalCost = totalSeatCost + totalFoodComboCost;

    // Save total cost to session storage
    sessionStorage.setItem('totalCost', JSON.stringify(totalCost));

    this.router.navigate(['/booking-type']); // Navigate to the booking type page
  }
}
