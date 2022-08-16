import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Lunch } from '../lunch/lunch.model';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  filter!: string;

  foodList: Food[] = [];
  foodEdit!: BehaviorSubject<any>; 

    @Inject(MAT_DIALOG_DATA) public data: any
    constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.foodEdit = new BehaviorSubject<any>('');
    sessionStorage.setItem('method', '');
  }

  onFoodAdded(food: Food){
    let i = this.foodList.findIndex((lunch) => food.name === lunch.name);
    if (i === -1){
      this.foodList.push(food);
    }else{
      this._snackBar.open("Produto já cadastrado!", "Fechar")
    } 
    // sessionStorage.setItem('index', this.index.toString());
  }

  onFoodEdited(food: Food){
    this.index = this.foodList.findIndex((lunch) => food.name === lunch.name);
    this.foodList.splice(this.index, 1);
    this.foodList.push(food);
    sessionStorage.setItem('method', '');
    // sessionStorage.setItem('index', this.index.toString());
  }

  edit(data: any){
    sessionStorage.setItem('method', 'edit');
    this.foodEdit.next(data)
  }

  onDelete(food: any){
    this.index = this.foodList.findIndex((lunch) => food.name === lunch.name);
    this.foodList.splice(this.index, 1);
  }
}
