import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild("select") selectOption!: ElementRef;
  select: any = "";
  selected: number = 1;

  constructor(private firestore: AngularFirestore) { }
  requestList!: any;
  parentElement!: Element;
  teste: any;

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

  convert2(value: any){
    return Number(value).toFixed(2).replace(".", ",");
  }

  valueCheck(data: any, id: any){
    this.select = data.value;
    if(this.select == 1){
      this.firestore.doc("requests/" + id).update({Status: this.select});
    }else if(this.select == 2){
      this.firestore.doc("requests/" + id).update({Status: this.select});
    }else if(this.select == 3){
      this.firestore.doc("requests/" + id).update({Status: this.select});
    }
  }

  rotate(i: any){
    let arrow = document.getElementById('arrow') as HTMLTableElement
    let info = document.getElementById(i) as HTMLDivElement;

    
    if(info.style.display == "block"){
      info.style.display = "none";
      arrow.id == "arrowDown";
    } else{
      info.style.display = "block";
      arrow.id == "arrowUp";
    }
  }
}
