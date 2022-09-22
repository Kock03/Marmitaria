import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  index: number = 0;
  bagIndex: any;
  amountIndex: any;
  id1: any;
  indexs: Array<any> = [];
  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore
      .doc('totalValue/' + 'nXyj42BTIeH77zNJAun7')
      .update({ totalValue: 0 });

      this.firestore
        .collection('lunch')
        .snapshotChanges()
        .subscribe((data) => {
          if(this.index <= data.length){
          this.index = data.length;
          this.amountIndex = data.map((e) => {
              let id = e.payload.doc.id;
              this.indexs.push(id);
              this.index++;
              for(let i = 0; i < this.indexs.length; i++) {
                this.firestore.doc("lunch/" + this.indexs[i]).update({bagAmount: 1});
              }
            });
          }
        });
  }
}
