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
  bagValueBagStatic: Array<number> = [];
  bagLenght!: number;
  bagImage!: any;
  data!: any;
  userID!: any;
  userBagAmount!: any;
  bagAmount: any;
  bagIndex: any;
  lunchList!: any;
  usersEx!: any;
  itemMode: boolean = false;

  constructor(private firestore: AngularFirestore, public dialogReview: MatDialogRef<LunchReviewDialogComponent>) {}

  ngOnInit() {
    
    this.bagValue = JSON.parse(sessionStorage.getItem('value')!);
    this.bagName = JSON.parse(sessionStorage.getItem('name')!);
    this.bagName.length > 1 ? this.itemMode = true : this.itemMode = false;
    this.bagValueBag = JSON.parse(sessionStorage.getItem('valueBag')!);
    this.bagValueBagStatic = JSON.parse(sessionStorage.getItem('bagValueEstatic')!);
    this.bagImage = JSON.parse(sessionStorage.getItem('imageLink')!);
    this.bagAmount = JSON.parse(sessionStorage.getItem('bagAmount')!);
    this.userID = sessionStorage.getItem('index');
    this.userBagAmount = sessionStorage.getItem('bagAmount');
    this.bagIndex = JSON.parse(sessionStorage.getItem('arrayBagIndex')!);
    this.firestore
        .collection('totalValue')
        .snapshotChanges()
        .subscribe( (data) => {
        this.usersEx = data.map( (e) => {
        let data = e.payload.doc.data()
        return {
            id: e.payload.doc.id,
            datas: data,
        };
        });
    });
  }

  removeFoodBag(i: any) {
    if (this.bagAmount[i] == 1) {
      this.bagValue = Number(this.bagValue) - Number(this.bagValueBagStatic[i]);
      const totalValue = this.bagValue
      const valueDataBase = {totalValue}
      this.firestore.doc('totalValue/' + 'nXyj42BTIeH77zNJAun7').update(valueDataBase)
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
      sessionStorage.setItem('imageLink', JSON.stringify(this.bagImage));
      sessionStorage.setItem('bagAmount', JSON.stringify(this.bagAmount));
      this.bagName.length > 1 ? this.itemMode = true : this.itemMode = false;

    }else{

      let number = Number(this.bagAmount[i]);
      this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number -= 1});
      this.bagAmount[i] = number;
      this.bagValueBag[i] = this.bagValueBagStatic[i] * number;
      this.bagValue = Number(this.bagValue) - Number(this.bagValueBagStatic[i]);
      const totalValue = this.bagValue
      const valueDataBase = {totalValue}
      this.firestore.doc('totalValue/' + 'nXyj42BTIeH77zNJAun7').update(valueDataBase)
      sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
      sessionStorage.setItem('value', JSON.stringify(this.bagValue));
      sessionStorage.setItem('name', JSON.stringify(this.bagName));
      sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBag));
      sessionStorage.setItem('imageLink', JSON.stringify(this.bagImage));
      sessionStorage.setItem('bagAmount', JSON.stringify(this.bagAmount));
      sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
    }

  }

  addFoodBag(i: any) {

    let number = Number(this.bagAmount[i]);
    this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number += 1});
    this.bagAmount[i] = number;
    this.bagValueBag[i] = this.bagValueBagStatic[i] * number;
    this.bagValue = Number(this.bagValue) + Number(this.bagValueBagStatic[i]);
    console.log("🚀 ~ file: lunch-review-dialog.component.ts ~ line 109 ~ LunchReviewDialogComponent ~ addFoodBag ~ this.bagValue", this.bagValue)
    const totalValue = this.bagValue
    const valueDataBase = {totalValue}
    this.firestore.doc('totalValue/' + 'nXyj42BTIeH77zNJAun7').update(valueDataBase)
    sessionStorage.setItem("bagValueFinal", JSON.stringify(this.bagValue));
    sessionStorage.setItem('value', JSON.stringify(this.bagValue));
    sessionStorage.setItem('name', JSON.stringify(this.bagName));
    sessionStorage.setItem('valueBag', JSON.stringify(this.bagValueBag));
    sessionStorage.setItem('imageLink', JSON.stringify(this.bagImage));
    sessionStorage.setItem('bagAmount', JSON.stringify(this.bagAmount));
  }

  clear(){ 
    const total = this.bagValue
    const newTotal = {total}
    // this.firestore.doc("total/" + "4yRGy1ea3EWrawygddOr").update(newTotal);
    let nameAdm = sessionStorage.getItem('name')
    let valueAdm = sessionStorage.getItem('valueBag')
    let bagAmountAdm = sessionStorage.getItem('bagAmount')
    let finalValueAdm = sessionStorage.getItem('bagValueFinal')
    let Status = "Pedido Realizado"
    const newRequest = {nameAdm, valueAdm, bagAmountAdm, finalValueAdm, Status}
    this.firestore.collection('requests').add(newRequest)
    alert("Pedido em preparo!");
    sessionStorage.clear();
    this.dialogReview.close();
  }

  closeDialog(){
    let data = {image: this.bagImage, amount: this.bagAmount, name: this.bagName, value: this.bagValueBag, valueTotal: this.bagValue, valueEstatic: this.bagValueBagStatic}
    this.dialogReview.close(data);
  }
}
