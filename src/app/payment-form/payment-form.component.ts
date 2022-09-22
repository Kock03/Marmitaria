import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }
  requestList!: any;

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

  

}
