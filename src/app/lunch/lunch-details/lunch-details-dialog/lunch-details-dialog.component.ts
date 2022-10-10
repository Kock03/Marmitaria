import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LunchListDialogComponent } from '../../lunch-list/lunch-list-dialog/lunch-list-dialog.component';
import { Lunch } from '../../lunch.model';
import { Firestore } from '@firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LunchListComponent } from '../../lunch-list/lunch-list.component';

@Component({
  selector: 'app-lunch-details-dialog',
  templateUrl: './lunch-details-dialog.component.html',
  styleUrls: ['./lunch-details-dialog.component.css']
})
export class LunchDetailsDialogComponent implements OnInit {

  lunch!: any;
  lunchEx!: any;

  myFormGroup: FormGroup;
  @Input() packageSelected!: Lunch;
  @Input() index!: number; 
  @Input() package!: Lunch;

  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LunchDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
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
      this.lunch = JSON.parse(sessionStorage.getItem('lunch')!);
      this.edition(this.lunch);
      this.lunchEx = sessionStorage.getItem('index');
    }
    
    edition(data: any){ 
      this.myFormGroup.patchValue({
        name: data.name,
        description: data.description,
        value: data.value,
        imagePath: data.imagePath
      })
    }

    refresh(){
      let value = this.myFormGroup.getRawValue();
      sessionStorage.setItem('lunch', JSON.stringify(value));
      this.firestore.doc('lunch/' + this.lunchEx).update(value);
    }

}
