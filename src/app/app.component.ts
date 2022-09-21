import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private firestore: AngularFirestore){}

  ngOnInit() {
    this.firestore.doc('totalValue/' + 'XfOkTFrYGRa1ViZ4lPVp').update({totalValue: 0});
  }
}
