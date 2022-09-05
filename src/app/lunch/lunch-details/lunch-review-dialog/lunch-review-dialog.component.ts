import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timeStamp } from 'console';
import { Lunch } from '../../lunch.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";

@Component({
  selector: 'app-lunch-review-dialog',
  templateUrl: './lunch-review-dialog.component.html',
  styleUrls: ['./lunch-review-dialog.component.css']
})
export class LunchReviewDialogComponent implements OnInit {
  @Input() packageSelected!: Lunch;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  bagValue: number;
  bagName!: any;
  bagValueBag!: any;
  bagLenght!: number;
  bagImage!: any;
  addNumber !: any;
  i!: any;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.bagValue = JSON.parse(sessionStorage.getItem('value')!);
    this.bagName = JSON.parse(sessionStorage.getItem('name')!);
    this.bagValueBag = JSON.parse(sessionStorage.getItem('valueBag')!);
    this.bagImage = JSON.parse(sessionStorage.getItem('imageLink')!);
    this.bagLenght = JSON.parse(sessionStorage.getItem('lenght')!);
    this.addNumber = 1;
  }

  removeFoodBag(i: any){
    let remove = document.getElementById('remove') as HTMLDivElement;
    let bagRemove = document.getElementById('bagRemove') as HTMLDivElement;
    if(this.addNumber == 1){
      this.bagValue = this.bagValue - this.bagValueBag[i];
      this.bagImage.splice(i, 1);
      this.bagName.splice(i, 1);
      this.bagValueBag.splice(i, 1);
    }else if(this.addNumber == 2){
      bagRemove.style.display = 'none';
      remove.style.display = 'block';
    }else{
      bagRemove.style.display = 'block';
      remove.style.display = 'none';
    }
    this.addNumber -= 1;
    this.bagValueBag[i] = this.bagValue * this.addNumber;
  }

  addFoodBag(i: any){
    let remove = document.getElementById('remove') as HTMLDivElement;
    let bagRemove = document.getElementById('bagRemove') as HTMLDivElement;
    if(this.addNumber == 1){
      remove.style.display = 'none';
      bagRemove.style.display = 'block';
    }
    this.addNumber += 1;
    this.bagValueBag[i] = this.bagValue * this.addNumber;
  }
}
