import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild("select") selectOption!: ElementRef;


  constructor(private firestore: AngularFirestore) { }
  requestList!: any;
  parentElement!: Element;

  ngOnInit(): void {
    this.firestore
      .collection('requests')
      .snapshotChanges()
      .subscribe(async (data) => {
        this.requestList = data.map((e) => {
          return {
            id: e.payload.doc.id,
            datas: e.payload.doc.data(),
          };
        });
    });
  }

  convert(value: any){
    return Number(value).toFixed(2).replace(".", ",");
  }

  valueCheck(i: any){
    const box = document.getElementsByClassName('custom-select')[0] as HTMLSelectElement;
    const selectValue = box.value;
  }

  rotate(){
    const arrowDown = document.getElementById('arrowDown') as HTMLDivElement;
    arrowDown.style.display = 'none';
    const arrowUp = document.getElementById('arrowUp') as HTMLDivElement;
    arrowUp.style.display = 'block';
  }
}
