import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timeStamp } from 'console';
import { Lunch } from '../../lunch.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-lunch-review-dialog',
  templateUrl: './lunch-review-dialog.component.html',
  styleUrls: ['./lunch-review-dialog.component.css'],
})
export class LunchReviewDialogComponent implements OnInit {
  @Input() packageSelected!: Lunch;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  bagValue: number;
  bagName!: any;
  bagValueBag!: any;
  bagValueBagStatic!: any;
  bagLenght!: number;
  bagImage!: any;
  data!: any;
  userID!: any;
  userBagAmount!: any;
  bagAmount: any;
  bagIndex: any;
  lunchList!: any;

  constructor(private firestore: AngularFirestore, public dialogReview: MatDialogRef<LunchReviewDialogComponent>) {}

  ngOnInit() {
    
    this.bagValue = JSON.parse(sessionStorage.getItem('value')!);
    this.bagName = JSON.parse(sessionStorage.getItem('name')!);
    this.bagValueBag = JSON.parse(sessionStorage.getItem('valueBag')!);
    this.bagValueBagStatic = JSON.parse(sessionStorage.getItem('valueBag')!);
    this.bagImage = JSON.parse(sessionStorage.getItem('imageLink')!);
    this.bagAmount = JSON.parse(sessionStorage.getItem('arrayBag')!);
    this.userID = sessionStorage.getItem('index');
    this.userBagAmount = sessionStorage.getItem('bagAmount');
    this.bagIndex = JSON.parse(sessionStorage.getItem('arrayBagIndex')!);
  }

  removeFoodBag(i: any) {
    if (this.bagAmount[i] == 1) {
      this.bagValue = Number(this.bagValue) - Number(this.bagValueBagStatic[i]);
      this.bagImage.splice(i, 1);
      this.bagName.splice(i, 1);
      this.bagAmount.splice(i, 1);
      this.bagValueBag.splice(i, 1);
      this.bagValueBagStatic.splice(i, 1);
      this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount: 1});
      sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
      sessionStorage.setItem('value', JSON.stringify(this.bagValue));
      sessionStorage.setItem('name', JSON.stringify(this.bagName));
      sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBag));
      sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBagStatic));
      sessionStorage.setItem('imageLink', JSON.stringify(this.bagImage));
      sessionStorage.setItem('arrayBag', JSON.stringify(this.bagAmount));
    }else{

      let number = Number(this.bagAmount[i]);
      this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number -= 1});
      this.bagAmount[i] = number;
      this.bagValueBag[i] = this.bagValueBagStatic[i] * number;
      this.bagValue = Number(this.bagValue) - Number(this.bagValueBagStatic[i]);
      sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
      sessionStorage.setItem('value', JSON.stringify(this.bagValue));
      sessionStorage.setItem('name', JSON.stringify(this.bagName));
      sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBag));
      sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBagStatic));
      sessionStorage.setItem('imageLink', JSON.stringify(this.bagImage));
      sessionStorage.setItem('arrayBag', JSON.stringify(this.bagAmount));
      sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
    }

  }

  addFoodBag(i: any) {

    let number = Number(this.bagAmount[i]);
    this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number += 1});
    this.bagAmount[i] = number;
    this.bagValueBag[i] = this.bagValueBagStatic[i] * number;
    this.bagValue = Number(this.bagValue) + Number(this.bagValueBagStatic[i]);
    sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
    sessionStorage.setItem('value', JSON.stringify(this.bagValue));
    sessionStorage.setItem('name', JSON.stringify(this.bagName));
    sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBag));
    sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBagStatic));
    sessionStorage.setItem('imageLink', JSON.stringify(this.bagImage));
    sessionStorage.setItem('arrayBag', JSON.stringify(this.bagAmount));
  }

  clear(){ 
    const total = this.bagValue
    const newTotal = {total}
    this.firestore.doc("total/Br2caSx62bfiF49cLt4E").update(newTotal);
    sessionStorage.clear();
    this.dialogReview.close();
  }

  closeDialog(){
    this.dialogReview.close();
  }
}
