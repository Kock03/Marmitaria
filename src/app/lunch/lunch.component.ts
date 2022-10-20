import { Component, OnInit } from '@angular/core';
import { Lunch } from './lunch.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {

  selectedPackage!: Lunch;
  switch!: any
  amountIndex: any;
  id1: string;
  indexs: Array<any> = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // let template = document.getElementById('info') as HTMLDivElement;
    // setTimeout(() => {
    //   template.style.display = 'block';
    // }, 5000);
    this.firestore.doc('totalValue/' + 'nXyj42BTIeH77zNJAun7').update({totalValue: 0});
  }
  
}
