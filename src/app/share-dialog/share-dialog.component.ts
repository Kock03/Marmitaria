import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';


@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
  value= "https://restaurante-teste-bf5c7.web.app/"
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 2;

  constructor(public dialogShared: MatDialogRef<ShareDialogComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  closeDialogShare(){
    this.dialogShared.close();
  }

  copyURL(){
    this.snackBar.open("Copiado para a área de transfêrencia!", "Fechar", {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
}
