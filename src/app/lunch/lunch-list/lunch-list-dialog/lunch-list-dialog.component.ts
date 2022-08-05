import { Component, ElementRef, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lunch } from '../../lunch.model';
import { LunchListComponent } from '../lunch-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    @Inject(MAT_DIALOG_DATA) public data: any

    ) {
      this.myFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        imagePath: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  async cadastre(){
    if(!this.myFormGroup.valid){
      return;
    } else{
      let lunch = this.myFormGroup.getRawValue();
      this.data.push(lunch);
      await this.dialogRef.close(true);
      sessionStorage.clear();
      return this.data
      
    }
  }
  async closed(){
    await this.dialogRef.close(true);
    sessionStorage.clear();
  }
}
