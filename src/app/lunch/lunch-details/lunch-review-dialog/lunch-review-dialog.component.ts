import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timeStamp } from 'console';
import { Lunch } from '../../lunch.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';

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
  bagLenght!: number;
  bagImage!: any;
 
  data!: any;
 
  userID!: any;
  userBagAmount!: any;
  bagAmount: any;
  bagIndex: any;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.bagValue = JSON.parse(sessionStorage.getItem('value')!);
    this.bagName = JSON.parse(sessionStorage.getItem('name')!);
    this.bagValueBag = JSON.parse(sessionStorage.getItem('valueBag')!);
    this.bagImage = JSON.parse(sessionStorage.getItem('imageLink')!);
    this.bagLenght = JSON.parse(sessionStorage.getItem('lenght')!);
    this.userID = sessionStorage.getItem('index');
    this.userBagAmount = sessionStorage.getItem('bagAmount');
    this.bagAmount = JSON.parse(sessionStorage.getItem('arrayBag')!);
    this.bagIndex = JSON.parse(sessionStorage.getItem('arrayBagIndex')!);
    console.log("🚀 ~ file: lunch-review-dialog.component.ts ~ line 40 ~ LunchReviewDialogComponent ~ ngOnInit ~ this.bagAmount", this.bagAmount)
  }

  removeFoodBag(i: any) {
    // if (this.bagAmount[i] == 1) {
    //   this.bagImage.splice(i, 1);
    //   this.bagName.splice(i, 1);
    //   this.bagValueBag.splice(i, 1);
    // } 
    let number = Number(this.bagAmount[i]);
    this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number -= 1});
    this.bagAmount[i] = number;
  }

  addFoodBag(i: any) {

    let number = Number(this.bagAmount[i]);
    this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number += 1});
    this.bagAmount[i] = number;
  }

  clear(){
    sessionStorage.clear();
    this.firestore.doc("lunch/" + this.bagIndex).update({bagAmount: 1});
  }
}
