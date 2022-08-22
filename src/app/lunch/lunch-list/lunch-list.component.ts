import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lunch } from '../lunch.model';
import { LunchListDialogComponent } from './lunch-list-dialog/lunch-list-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
})
export class LunchListComponent implements OnInit {
  
  @Output() packageWasSelected = new EventEmitter<Lunch>();
  packages: Lunch[] = [];

  method!: string;
  index!: any;
  filter!: string;
  packageEx: any;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore) {}

 async ngOnInit(){
    this.firestore.collection('lunch').snapshotChanges().subscribe(async data => {
      this.packageEx = data.map(e =>{
        return{
          id: e.payload.doc.id,
          datas: e.payload.doc.data(),    
        };  
      })
      this.packages = this.packageEx;
    })
  }

  onPackageSelected(packageSelected: any) {
    this.index = this.packages.findIndex(
      (lunch: Lunch) => packageSelected.description === lunch.description
    );
    console.log("🚀 ~ file: lunch-list.component.ts ~ line 50 ~ LunchListComponent ~ onPackageSelected ~ this.index", this.index)
    sessionStorage.setItem('index', packageSelected.id);
    this.packageWasSelected.emit(packageSelected.datas);
  }

  onDelete(result_id: any) {
    this.firestore.doc('lunch/' + result_id).delete();
  }

  onEdit(recordID: any, record: any) {
    this.firestore.doc('lunch/' + recordID).update(record);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LunchListDialogComponent, {
      data: this.packages,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let i = this.packageEx.findIndex((datas: Lunch) =>
            result.description === datas.description &&
            result.name === datas.name);
        if (i === -1) {
          this.firestore.collection('lunch').add(result);
          // this.packages.push(result); 
        }else{
          this._snackBar.open("Produto já cadastrado!", "Fechar");
        }
      }
    });
  }
}
