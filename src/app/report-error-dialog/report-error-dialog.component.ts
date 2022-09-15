import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-report-error-dialog',
  templateUrl: './report-error-dialog.component.html',
  styleUrls: ['./report-error-dialog.component.css']
})
export class ReportErrorDialogComponent implements OnInit {
  @ViewChild("error") error!: ElementRef;

    constructor(public dialogShared: MatDialogRef<ReportErrorDialogComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }
  closeDialogShare(){
    this.dialogShared.close();
  }

  addReport(){
    document.getElementById('input')
    if(this.error.nativeElement.value == ""){
      alert("Por favor, informe o erro!")
    }else{
      const inputError = this.error.nativeElement.value;
      const newError = {inputError}
      this.firestore.collection('report-error').add(newError);
      this.error.nativeElement.value = "";
      alert("Erro enviado para análise. Obrigado por reportar!")
    }
  }
}
