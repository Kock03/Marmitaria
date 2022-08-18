import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lunch } from '../lunch.model';
import { LunchListDialogComponent } from './lunch-list-dialog/lunch-list-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
})
export class LunchListComponent implements OnInit {
  packages: Lunch[] = [];

  @Output() packageWasSelected = new EventEmitter<Lunch>();

  method!: string;
  index!: any;
  filter!: string;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore) {}

  ngOnInit() {
    return this.firestore.collection('lunch').snapshotChanges();
  }

  onPackageSelected(packageSelected: Lunch) {
    this.index = this.packages.findIndex(
      (lunch) => packageSelected.description === lunch.description
    );
    sessionStorage.setItem('index', this.index.toString());
    this.packageWasSelected.emit(packageSelected);
  }

  onDelete(event: any) {
    this.index = sessionStorage.getItem('index');
    this.packages.splice(this.index, 1);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LunchListDialogComponent, {
      data: this.packages,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let i = this.packages.findIndex((lunch) =>
            result.description === lunch.description &&
            result.name === lunch.name);
        if (i === -1) {
          this.firestore.collection('lunch').add(result);
          this.packages.push(result); 
        }else{
          this._snackBar.open("Produto já cadastrado!", "Fechar");
        }
      }
    });
  }
}
