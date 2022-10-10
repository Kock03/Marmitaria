import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-report-error-dialog',
  templateUrl: './report-error-dialog.component.html',
  styleUrls: ['./report-error-dialog.component.css']
})
export class ReportErrorDialogComponent implements OnInit {
  @ViewChild("error") error!: ElementRef;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

    constructor(public dialogShared: MatDialogRef<ReportErrorDialogComponent>, private firestore: AngularFirestore, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  closeDialogShare(){
    this.dialogShared.close();
  }

  addReport(){
    document.getElementById('input')
    if(this.error.nativeElement.value == ""){
      this._snackBar.open("Por favor, informe o erro!", 'Fechar' ,{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }else{
      const inputError = this.error.nativeElement.value;
      const newError = {inputError}
      this.firestore.collection('report-error').add(newError);
      this.error.nativeElement.value = "";
      this._snackBar.open("Erro enviado para análise. Obrigado por reportar!", 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }
}
