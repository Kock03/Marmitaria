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
    packageValue: Array<string> = [];
    packageImage: Array<string> = [];
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
    }

    sumPackage(){
        this.sum = this.sum + this.packageSelected.value
        let bagValue = JSON.stringify(this.packageSelected.value)
        let bagName = JSON.stringify(this.packageSelected.name)
        let bagImage = this.packageSelected.imagePath
        this.packageName.push(bagName);
        this.packageValue.push(bagValue);
        this.packageImage.push(bagImage);
        sessionStorage.setItem('name', JSON.stringify(this.packageName))!;
        sessionStorage.setItem('valueBag', JSON.stringify(this.packageValue))!;
        sessionStorage.setItem('imageLink', JSON.stringify(this.packageImage))!;
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

