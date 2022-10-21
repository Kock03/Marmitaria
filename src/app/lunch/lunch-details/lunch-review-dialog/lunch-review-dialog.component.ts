import { Component, EventEmitter, Inject, Input, IterableDiffers, OnInit, Output, SimpleChanges } from '@angular/core';
import { timeStamp } from 'console';
import { Lunch } from '../../lunch.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Pipe, PipeTransform } from '@angular/core'
import { formatDate } from '@angular/common';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { BehaviorSubject } from "rxjs";



@Component({
  selector: 'app-lunch-review-dialog',
  templateUrl: './lunch-review-dialog.component.html',
  styleUrls: ['./lunch-review-dialog.component.css'],
})
export class LunchReviewDialogComponent implements OnInit {

  bagValue: number;
  bagName!: any;
  bagValueBag!: any;
  bagValueBagStatic: Array<number> = [];
  bagLenght!: number;
  bagImage!: any;
  userBagAmount!: any;
  bagAmount: any;
  bagIndex: any;
  lunchList!: any;
  usersEx!: any;
  itemMode: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: AngularFirestore,
    public dialogReview: MatDialogRef<LunchReviewDialogComponent>, 
    private _snackBar: MatSnackBar,){}

  ngOnInit() {
    this.bagValue = JSON.parse(sessionStorage.getItem('value')!);
    this.bagName = this.data.packageName;
    this.bagName.length > 1 ? this.itemMode = true : this.itemMode = false;
    this.bagValueBag = this.data.packageValue;
    this.bagValueBagStatic = this.data.valueEstatic;
    this.bagImage = this.data.packageImage;
    this.bagAmount = this.data.packageAmount;
    this.userBagAmount = this.data.packageAmount;
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
    }
  }

  addFoodBag(i: any) {
    let number = Number(this.bagAmount[i]);
    this.firestore.doc("lunch/" + this.bagIndex[i]).update({bagAmount:number += 1});
    this.bagAmount[i] = number;
    this.bagValueBag[i] = this.bagValueBagStatic[i] * number;
    this.bagValue = Number(this.bagValue) + Number(this.bagValueBagStatic[i]);
    const totalValue = this.bagValue
    this.data.sum = this.bagValue
    const valueDataBase = {totalValue}
    this.firestore.doc('totalValue/' + 'nXyj42BTIeH77zNJAun7').update(valueDataBase)
  }

  addRequest(){ 
    const total = this.bagValue
    const newTotal = {total}
    let nameAdm = this.data.packageName;
    let valueAdm = this.data.packageValue;
    let bagAmountAdm = this.data.packageAmount;
    let finalValueAdm = this.data.sum;
    let status = 1;
    let date = new Date();
    let dateAndHour = formatDate(date, 'dd/MM/yyyy hh:mm:ss a', 'en-US')
    const newRequest = {nameAdm, valueAdm, bagAmountAdm, finalValueAdm, status, dateAndHour}
    this.firestore.collection('requests').add(newRequest)
    this._snackBar.open("Pedido Realizado!", 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
    sessionStorage.clear();
    this.dialogReview.close();
    this.firestore.doc("totalValue/" + "nXyj42BTIeH77zNJAun7").update({totalValue: 0});
  }

  closeDialog(){
    let data = {image: this.bagImage, amount: this.bagAmount, name: this.bagName, value: this.bagValueBag, valueTotal: this.bagValue, valueEstatic: this.bagValueBagStatic}
    this.dialogReview.close(data);
  }
}
