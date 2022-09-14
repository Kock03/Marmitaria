import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
  value= "http://localhost:4200/"

  constructor(public dialogShared: MatDialogRef<ShareDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialogShare(){
    this.dialogShared.close();
  }
  



}
