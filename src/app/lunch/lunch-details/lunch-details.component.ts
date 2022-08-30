import { ChangeDetectorRef, Component, Input, Output } from "@angular/core";
import { Lunch } from "../lunch.model";
import { LunchListComponent } from "../lunch-list/lunch-list.component";
import { LunchListDialogComponent } from "../lunch-list/lunch-list-dialog/lunch-list-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { LunchDetailsDialogComponent } from "./lunch-details-dialog/lunch-details-dialog.component";
import { reduce } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LunchReviewDialogComponent } from "./lunch-review-dialog/lunch-review-dialog.component";
import { serverTimestamp } from "@firebase/firestore";



@Component({
    selector : 'app-lunch-details',
    templateUrl : './lunch-details.component.html',
    styleUrls: ['./lunch-details.component.css']
    
})

export class LunchDetailsComponent{
    index!: any
    packageName: Array<string> = [];
    sum!: number;
    @Input() packageSelected!: Lunch;
    @Input() packages!: any;
    constructor(public dialogDetail: MatDialog, private cdr: ChangeDetectorRef, private firestore: AngularFirestore){}
    ngOnInit(): void {
        sessionStorage.setItem('value',  JSON.stringify(this.packageSelected.value));
        this.index = sessionStorage.getItem('index')
        this.sum = 0;
    }
    
    openDialogDetail(){
        const dialogRef = this.dialogDetail.open(LunchDetailsDialogComponent, {
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.packageSelected = JSON.parse(sessionStorage.getItem('lunch')!);
            
        });
    }

    removeLunch(){
        this.packages.splice(this.index, 1);
        // console.log("🚀 ~ file: lunch-details.component.ts ~ line 34 ~ LunchDetailsComponent ~ removeLunch ~ this.index", this.index)
    }

    sumPackage(){
        this.sum = this.sum + this.packageSelected.value
        this.packageName.push(JSON.stringify(this.packageSelected.name));
        sessionStorage.setItem('name', JSON.stringify(this.packageName))!;
    }
    
    openDialogReview(){
        const dialogRef = this.dialogDetail.open(LunchReviewDialogComponent, {
        });
        if(this.sum == 0){
            sessionStorage.clear();
        }
        sessionStorage.setItem('value',JSON.stringify(this.sum))!; 
        
    }
}

