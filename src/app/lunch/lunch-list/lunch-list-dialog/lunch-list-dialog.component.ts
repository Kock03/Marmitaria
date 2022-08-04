import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lunch-list-dialog',
  templateUrl: './lunch-list-dialog.component.html',
})
export class LunchListDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LunchListDialogComponent>
    ) {}

  ngOnInit(): void {
  }
}
