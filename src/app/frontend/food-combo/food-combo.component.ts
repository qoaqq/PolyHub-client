// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';
// @Component({
//   selector: 'app-food-combo',
//   templateUrl: './food-combo.component.html',
//   styleUrls: ['./food-combo.component.scss']
// })
// export class FoodComboComponent {
//   foodCombos: any[] = [];
//   selectedFoodCombos: Set<number> = new Set();
//   totalFoodComboCost: number = 0;
//   constructor(
//     private foodComboService: FoodComboService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loadFoodCombos();
//     this.loadSelectedFoodCombos();
//   }

//   loadFoodCombos(): void {
//     this.foodComboService.getFoodCombos().subscribe(
//       (data) => {
//         this.foodCombos = data.data.data;
//         console.log('Food Combos:', this.foodCombos);
//       },
//       (error) => {
//         console.error('Error fetching food combos:', error);
//       }
//     );
//   }

//   loadSelectedFoodCombos(): void {
//     const storedCombos = sessionStorage.getItem('selectedFoodCombos');
//     if (storedCombos) {
//       this.selectedFoodCombos = new Set(JSON.parse(storedCombos));
//       this.updateTotalFoodComboCost(); 
//     }
//   }

//   isSelected(foodComboId: number): boolean {
//     return this.selectedFoodCombos.has(foodComboId);
//   }

//   onFoodComboSelect(foodCombo: any): void {
//     if (this.selectedFoodCombos.has(foodCombo)) {
//       this.selectedFoodCombos.delete(foodCombo);
//     } else {
//       this.selectedFoodCombos.add(foodCombo);
//     }
//     sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos)));
//   }
//   updateTotalFoodComboCost(): void {
//     const foodCombos = JSON.parse(sessionStorage.getItem('selectedFoodCombos') || '[]');
//     this.totalFoodComboCost = foodCombos.reduce((total: number, combo: any) => total + combo.price, 0);

//     // Save food combo cost to session storage
//     sessionStorage.setItem('totalFoodComboCost', JSON.stringify(this.totalFoodComboCost));
//   }
//   // confirmSelection(): void {
//   //   if (this.selectedFoodCombos.size === 0) {
//   //     alert('Please select at least one food combo');
//   //     return;
//   //   }
//   //   // Navigate to the next page or handle the selection as needed
//   //   this.router.navigate(['/booking-type']); // Assuming there's a summary page
//   // }
//    confirmSelection(): void {
//     // Calculate total cost including both seats and food combos
//     const totalSeatCost = JSON.parse(sessionStorage.getItem('totalSeatCost') || '0');
//     const totalFoodComboCost = this.totalFoodComboCost;
//     const totalCost = totalSeatCost + totalFoodComboCost;

//     // Save total cost to session storage
//     sessionStorage.setItem('totalCost', JSON.stringify(totalCost));

//     this.router.navigate(['/booking-type']); // Navigate to the booking type page
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

// @Component({
//   selector: 'app-food-combo',
//   templateUrl: './food-combo.component.html',
//   styleUrls: ['./food-combo.component.scss']
// })
// export class FoodComboComponent implements OnInit {
//   foodCombos: any[] = [];
//   selectedFoodCombos: Set<number> = new Set();
//   totalFoodComboCost: number = 0;

//   constructor(
//     private foodComboService: FoodComboService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loadFoodCombos();
//     this.loadSelectedFoodCombos();
//   }

//   loadFoodCombos(): void {
//     this.foodComboService.getFoodCombos().subscribe(
//       (data) => {
//         this.foodCombos = data.data.data;
//         console.log('Food Combos:', this.foodCombos);
//         this.loadSelectedFoodCombos(); // Ensure combos are loaded after fetching data
//       },
//       (error) => {
//         console.error('Error fetching food combos:', error);
//       }
//     );
//   }

//   loadSelectedFoodCombos(): void {
//     const storedCombos = sessionStorage.getItem('selectedFoodCombos');
//     if (storedCombos) {
//       this.selectedFoodCombos = new Set(JSON.parse(storedCombos));
//       this.updateTotalFoodComboCost();
//     }
//   }

//   isSelected(foodComboId: number): boolean {
//     return this.selectedFoodCombos.has(foodComboId);
//   }

//   onFoodComboSelect(foodCombo: any): void {
//     // Kiểm tra xem combo hiện tại có trong tập hợp các combo đã chọn không.
//     if (Array.from(this.selectedFoodCombos).some(combo => combo.id === foodCombo.id)) {
//       // Nếu có, xóa combo khỏi tập hợp đã chọn.
//       this.selectedFoodCombos = new Set(Array.from(this.selectedFoodCombos).filter(combo => combo.id !== foodCombo.id));
//     } else {
//       // Nếu không có, thêm combo vào tập hợp đã chọn.
//       this.selectedFoodCombos.add(foodCombo);
//     }
  
//     // Lưu tập hợp các combo đã chọn vào session storage dưới dạng mảng JSON.
//     sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos)));
  
//     // Cập nhật tổng chi phí mỗi khi lựa chọn thay đổi.
//     this.updateTotalFoodComboCost();
//   }
  
//   updateTotalFoodComboCost(): void {
//     const selectedCombos = Array.from(this.selectedFoodCombos);
//     this.totalFoodComboCost = selectedCombos.reduce((total, combo) => total + parseFloat(combo.price), 0);
  
//     // Save food combo cost to session storage
//     sessionStorage.setItem('totalFoodComboCost', JSON.stringify(this.totalFoodComboCost));
//   }
  
//   confirmSelection(): void {
//     // Calculate total cost including both seats and food combos
//     const totalSeatCost = parseFloat(sessionStorage.getItem('totalSeatCost') || '0');
//     const totalFoodComboCost = this.totalFoodComboCost;
//     const totalCost = totalSeatCost + totalFoodComboCost;

//     // Save total cost to session storage
//     sessionStorage.setItem('totalCost', JSON.stringify(totalCost));

//     this.router.navigate(['/booking-type']); // Navigate to the booking type page
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

// @Component({
//   selector: 'app-food-combo',
//   templateUrl: './food-combo.component.html',
//   styleUrls: ['./food-combo.component.scss']
// })
// export class FoodComboComponent implements OnInit {
//   foodCombos: any[] = [];
//   selectedFoodCombos: Set<any> = new Set(); // Thay đổi kiểu dữ liệu ở đây
//   totalFoodComboCost: number = 0;

//   constructor(
//     private foodComboService: FoodComboService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loadFoodCombos();
//     this.loadSelectedFoodCombos();
//   }

//   loadFoodCombos(): void {
//     this.foodComboService.getFoodCombos().subscribe(
//       (data) => {
//         this.foodCombos = data.data.data;
//         console.log('Food Combos:', this.foodCombos);
//       },
//       (error) => {
//         console.error('Error fetching food combos:', error);
//       }
//     );
//   }

//   loadSelectedFoodCombos(): void {
//     const storedCombos = sessionStorage.getItem('selectedFoodCombos');
//     if (storedCombos) {
//       this.selectedFoodCombos = new Set(JSON.parse(storedCombos));
//       this.updateTotalFoodComboCost();
//     }
//   }

//   isSelected(foodComboId: number): boolean {
//     return Array.from(this.selectedFoodCombos).some(combo => combo.id === foodComboId);
//   }

//   onFoodComboSelect(foodCombo: any): void {
//     if (Array.from(this.selectedFoodCombos).some(combo => combo.id === foodCombo.id)) {
//       // Nếu có, xóa combo khỏi tập hợp đã chọn.
//       this.selectedFoodCombos = new Set(Array.from(this.selectedFoodCombos).filter(combo => combo.id !== foodCombo.id));
//     } else {
//       // Nếu không có, thêm combo vào tập hợp đã chọn.
//       this.selectedFoodCombos.add(foodCombo);
//     }

//     // Lưu tập hợp các combo đã chọn vào session storage dưới dạng mảng JSON.
//     sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos)));

//     // Cập nhật tổng chi phí mỗi khi lựa chọn thay đổi.
//     this.updateTotalFoodComboCost();
//   }

//   updateTotalFoodComboCost(): void {
//     const selectedCombos = Array.from(this.selectedFoodCombos);
//     this.totalFoodComboCost = selectedCombos.reduce((total, combo) => total + parseFloat(combo.price), 0);

//     // Save food combo cost to session storage
//     sessionStorage.setItem('totalFoodComboCost', JSON.stringify(this.totalFoodComboCost));
//   }

//   confirmSelection(): void {
//     // Calculate total cost including both seats and food combos
//     const totalSeatCost = parseFloat(sessionStorage.getItem('totalSeatCost') || '0');
//     const totalFoodComboCost = this.totalFoodComboCost;
//     const totalCost = totalSeatCost + totalFoodComboCost;

//     // Save total cost to session storage
//     sessionStorage.setItem('totalCost', JSON.stringify(totalCost));

//     this.router.navigate(['/booking-type']); // Navigate to the booking type page
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

// @Component({
//   selector: 'app-food-combo',
//   templateUrl: './food-combo.component.html',
//   styleUrls: ['./food-combo.component.scss']
// })
// export class FoodComboComponent implements OnInit {
//   foodCombos: any[] = [];
//   selectedFoodCombos: Map<number, { combo: any, quantity: number }> = new Map();
//   totalFoodComboCost: number = 0;

//   constructor(
//     private foodComboService: FoodComboService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loadFoodCombos();
//     this.loadSelectedFoodCombos();
//   }

//   loadFoodCombos(): void {
//     this.foodComboService.getFoodCombos().subscribe(
//       (data) => {
//         this.foodCombos = data.data.data;
//         console.log('Food Combos:', this.foodCombos);
//       },
//       (error) => {
//         console.error('Error fetching food combos:', error);
//       }
//     );
//   }

//   loadSelectedFoodCombos(): void {
//     const storedCombos = sessionStorage.getItem('selectedFoodCombos');
//     if (storedCombos) {
//       const parsedCombos = JSON.parse(storedCombos);
//       this.selectedFoodCombos = new Map(parsedCombos.map((item: any) => [item.combo.id, item]));
//       this.updateTotalFoodComboCost();
//     }
//   }

//   isSelected(foodComboId: number): boolean {
//     return this.selectedFoodCombos.has(foodComboId);
//   }

//   onFoodComboSelect(foodCombo: any, quantity: number): void {
//     if (quantity <= 0) {
//       this.selectedFoodCombos.delete(foodCombo.id);
//     } else {
//       this.selectedFoodCombos.set(foodCombo.id, { combo: foodCombo, quantity });
//     }

//     // Lưu tập hợp các combo đã chọn vào session storage dưới dạng mảng JSON.
//     sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos.values())));

//     // Cập nhật tổng chi phí mỗi khi lựa chọn thay đổi.
//     this.updateTotalFoodComboCost();
//   }

//   updateTotalFoodComboCost(): void {
//     this.totalFoodComboCost = Array.from(this.selectedFoodCombos.values()).reduce(
//       (total, { combo, quantity }) => total + parseFloat(combo.price) * quantity,
//       0
//     );

//     // Lưu tổng chi phí combo thực phẩm vào session storage
//     sessionStorage.setItem('totalFoodComboCost', JSON.stringify(this.totalFoodComboCost));
//   }

//   onQuantityChange(foodCombo: any, quantity: number): void {
//     if (quantity <= 0) {
//       this.selectedFoodCombos.delete(foodCombo.id);
//     } else {
//       this.selectedFoodCombos.set(foodCombo.id, { combo: foodCombo, quantity });
//     }

//     // Lưu tập hợp các combo đã chọn vào session storage dưới dạng mảng JSON.
//     sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos.values())));

//     // Cập nhật tổng chi phí mỗi khi lựa chọn thay đổi.
//     this.updateTotalFoodComboCost();
//   }

//   confirmSelection(): void {
//     // Tính tổng chi phí bao gồm cả ghế và combo thực phẩm
//     const totalSeatCost = parseFloat(sessionStorage.getItem('totalSeatCost') || '0');
//     const totalFoodComboCost = this.totalFoodComboCost;
//     const totalCost = totalSeatCost + totalFoodComboCost;

//     // Lưu tổng chi phí vào session storage
//     sessionStorage.setItem('totalCost', JSON.stringify(totalCost));

//     this.router.navigate(['/booking-type']); // Điều hướng tới trang loại đặt chỗ
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodComboService } from 'src/app/services/food-combo/food-combo.service';

@Component({
  selector: 'app-food-combo',
  templateUrl: './food-combo.component.html',
  styleUrls: ['./food-combo.component.scss']
})
export class FoodComboComponent implements OnInit {
  foodCombos: any[] = [];
  selectedFoodCombos: Map<number, { combo: any, quantity: number }> = new Map();
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
      const parsedCombos = JSON.parse(storedCombos);
      this.selectedFoodCombos = new Map(parsedCombos.map((item: any) => [item.combo.id, item]));
      this.updateTotalFoodComboCost();
    }
  }

  isSelected(foodComboId: number): boolean {
    return this.selectedFoodCombos.has(foodComboId);
  }

  getQuantity(foodComboId: number): number {
    const selected = this.selectedFoodCombos.get(foodComboId);
    return selected ? selected.quantity : 0;
  }

  onFoodComboSelect(foodCombo: any, quantity: number): void {
    if (quantity <= 0) {
      this.selectedFoodCombos.delete(foodCombo.id);
    } else {
      this.selectedFoodCombos.set(foodCombo.id, { combo: foodCombo, quantity });
    }

    sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos.values())));
    this.updateTotalFoodComboCost();
  }

  onQuantityChange(foodCombo: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
  
    if (quantity <= 0) {
      this.selectedFoodCombos.delete(foodCombo.id);
    } else {
      this.selectedFoodCombos.set(foodCombo.id, { combo: foodCombo, quantity });
    }
  
    sessionStorage.setItem('selectedFoodCombos', JSON.stringify(Array.from(this.selectedFoodCombos.values())));
    this.updateTotalFoodComboCost();
  }
  

  updateTotalFoodComboCost(): void {
    this.totalFoodComboCost = Array.from(this.selectedFoodCombos.values()).reduce(
      (total, { combo, quantity }) => total + parseFloat(combo.price) * quantity,
      0
    );

    sessionStorage.setItem('totalFoodComboCost', JSON.stringify(this.totalFoodComboCost));
  }

  confirmSelection(): void {
    const totalSeatCost = parseFloat(sessionStorage.getItem('totalSeatCost') || '0');
    const totalFoodComboCost = this.totalFoodComboCost;
    const totalCost = totalSeatCost + totalFoodComboCost;

    sessionStorage.setItem('totalCost', JSON.stringify(totalCost));
    this.router.navigate(['/booking-type']);
  }
}
