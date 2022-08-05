import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/food.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foodList: Food[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onFoodAdded(food: Food){
    this.foodList.push(food);
  }

}
