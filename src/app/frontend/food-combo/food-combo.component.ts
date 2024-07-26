import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food-combo',
  templateUrl: './food-combo.component.html',
  styleUrls: ['./food-combo.component.scss']
})
export class FoodComboComponent{
  @Input() foodCombos: any[] = [];
  @Output() quantityChange = new EventEmitter<{ combo: any; quantity: number }>();

  onQuantityChange(combo: any, quantity: number): void {
    this.quantityChange.emit({ combo, quantity });
  }
}
