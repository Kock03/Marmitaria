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
  select = "";

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

    var monthString = 'Sushi,Pizza';
    
    var comma = ',';
    var teste = monthString.split(comma)
    console.log("🚀 ~ file: payment-form.component.ts ~ line 38 ~ PaymentFormComponent ~ ngOnInit ~ teste", teste)
    
    
  }

  convert(value: any){
    return Number(value).toFixed(2).replace(".", ",");
  }

  convert2(value: any){
    return Number(value).toFixed(2).replace(".", ",");
  }

  valueCheck(i: any){
    const box = document.getElementById('format') as HTMLSelectElement;
    var selectValue = Number(box.value);
    console.log("🚀 ~ file: payment-form.component.ts ~ line 55 ~ PaymentFormComponent ~ valueCheck ~ selectValue", selectValue)
    if(selectValue == 1){
      this.firestore.doc('requests/' + i).update({Status: selectValue})
      box.value = "1"
    }else if(selectValue == 2){
      this.firestore.doc('requests/' + i).update({Status: selectValue})
      box.value = "2"
    }else if(selectValue == 3){
      this.firestore.doc('requests/' + i).update({Status: selectValue})
      box.value = "3"
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
