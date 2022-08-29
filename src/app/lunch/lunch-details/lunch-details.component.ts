import { ChangeDetectorRef, Component, Input, Output } from "@angular/core";
import { Lunch } from "../lunch.model";
import { LunchListComponent } from "../lunch-list/lunch-list.component";
import { LunchListDialogComponent } from "../lunch-list/lunch-list-dialog/lunch-list-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { LunchDetailsDialogComponent } from "./lunch-details-dialog/lunch-details-dialog.component";
import { reduce } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
    selector : 'app-lunch-details',
    templateUrl : './lunch-details.component.html',
    styleUrls: ['./lunch-details.component.css']
    
})

export class LunchDetailsComponent{
    
    index!: any
    @Input() packageSelected!: Lunch;
    @Input() packages!: any;
    constructor(public dialogDetail: MatDialog, private cdr: ChangeDetectorRef, private firestore: AngularFirestore){}
    ngOnInit(): void {
        this.index = sessionStorage.getItem('index')
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

    sum(){
        let sum = 0;
        for(let i = 0; i < 10; i++){
            sum = sum + this.packageSelected.value;
            console.log(sum);
            return
        }
    }
}

