import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bagIndex: any;
  amountIndex: any;
  constructor(private firestore: AngularFirestore){}

  ngOnInit() {
    this.firestore.doc('totalValue/' + 'XfOkTFrYGRa1ViZ4lPVp').update({totalValue: 0});
    this.bagIndex = JSON.parse(sessionStorage.getItem('arrayBagIndex')!);
    this.firestore
        .collection('lunch')
        .snapshotChanges()
        .subscribe( (data) => {
        this.amountIndex = data.map( (e) => {
        let data = e.payload.doc.data()
        let id = e.payload.doc.id
        for(let i = 0; i < id.length; i++) {
          console.log(id[i])
          // this.firestore.doc("lunch/" + id[i]).update({bagAmount: 1});
        }
        
        return {
            id: e.payload.doc.id,
            datas: data,
          };
        });
      });
  }
}
