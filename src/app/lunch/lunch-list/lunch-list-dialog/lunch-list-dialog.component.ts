import { Component, ElementRef, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lunch } from '../../lunch.model';
import { LunchListComponent } from '../lunch-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-lunch-list-dialog',
  templateUrl: './lunch-list-dialog.component.html',
})
export class LunchListDialogComponent implements OnInit {

  myFormGroup: FormGroup;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LunchListDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) {
      this.myFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        value: ['', Validators.required],
        imagePath: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  cadastre(){
    if(!this.myFormGroup.valid){
      return;
    } else{
      let lunch = this.myFormGroup.getRawValue();
      this.dialogRef.close(lunch); 
    }
  }
}

