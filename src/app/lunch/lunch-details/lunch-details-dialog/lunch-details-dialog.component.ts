import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LunchListDialogComponent } from '../../lunch-list/lunch-list-dialog/lunch-list-dialog.component';
import { Lunch } from '../../lunch.model';

@Component({
  selector: 'app-lunch-details-dialog',
  templateUrl: './lunch-details-dialog.component.html',
  styleUrls: ['./lunch-details-dialog.component.css']
})
export class LunchDetailsDialogComponent implements OnInit {

  

  myFormGroup: FormGroup;
  @Input() packageSelected!: Lunch;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LunchListDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) {
      this.myFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        imagePath: ['', Validators.required]
      });
    }

    

  ngOnInit(): void {
  }

}
