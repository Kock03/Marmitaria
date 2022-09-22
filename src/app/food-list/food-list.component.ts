import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Lunch } from '../lunch/lunch.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Food } from '../shared/food.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  fileName= 'Estoque.xlsx';
  food!: any;
  @Input() package!: Lunch;
  index!: any;
  @Input() delete: EventEmitter<any> = new EventEmitter();
  filter!: string;
  foodEx!: any;
  foodId!: any;
  inputMode: boolean = false;

  foodList: Food[] = [];
  foodEdit!: BehaviorSubject<any>; 

    @Inject(MAT_DIALOG_DATA) public data: any
    constructor
    (
      private _snackBar: MatSnackBar,
      private firestore: AngularFirestore
      ) { }

  async ngOnInit(){
    this.foodEdit = new BehaviorSubject<any>('');
    sessionStorage.setItem('method', '');
    this.firestore
    .collection('food')
    .snapshotChanges()
    .subscribe(async (data) => {
      this.foodEx = data.map((e) => {
        return {
          id: e.payload.doc.id,
          datas: e.payload.doc.data(),
        };
      });
      this.foodList = this.foodEx;
    })
    let user =  JSON.parse(localStorage.getItem("user")!);
    user.uid === "SHfa4hba4RaCMR78REr5mVTlxBD2" ? this.inputMode = true : this.inputMode = false;
  }

  onFoodAdded(food: any){
    let i = this.foodEx.findIndex((lunch: any) => lunch.datas.name === food.name);
    if (i === -1){
      
    }else{
      this._snackBar.open("Produto já cadastrado!", "Fechar")
    } 
  }

  onFoodEdited(food: Food){
    // this.index = this.foodEx.findIndex((lunch: any) => food.name === lunch.name);
    // this.foodEx.splice(this.index, 1);
    // this.foodEx.push(food);
    sessionStorage.setItem('method', '');
    this.firestore.doc('food/' + this.foodId).update(food);
  }

  edit(data: any){
    sessionStorage.setItem('method', 'edit');
    this.foodEdit.next(data)
  }

  onDelete(food: any){
    this.firestore.doc('food/' + food).delete();
  }

  exportexcel(): void
    {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
    }

  
}
