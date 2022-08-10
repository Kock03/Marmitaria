import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lunch } from '../lunch/lunch.model';
import { Food } from '../shared/food.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  food!: any;
  @Input() package!: Lunch;
  index!: any;
  @Input() delete: EventEmitter<any> = new EventEmitter();

  foodList: Food[] = [];

    @Inject(MAT_DIALOG_DATA) public data: any
    constructor() { }

  ngOnInit(): void {
  }

  onFoodAdded(food: Food){
    this.foodList.push(food);
    sessionStorage.setItem('index', this.index.toString());
  }

  onDelete(food: any){
    this.index = this.foodList.findIndex((lunch) => food.name === lunch.name);
    this.foodList.splice(this.index, 1);
  }
}
