import { Component, Input, Output } from "@angular/core";
import { Lunch } from "../lunch.model";
import { LunchListComponent } from "../lunch-list/lunch-list.component";
import { LunchListDialogComponent } from "../lunch-list/lunch-list-dialog/lunch-list-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { LunchDetailsDialogComponent } from "./lunch-details-dialog/lunch-details-dialog.component";
@Component({
    selector : 'app-lunch-details',
    templateUrl : './lunch-details.component.html',
    styleUrls: ['./lunch-details.component.css']
    
})

export class LunchDetailsComponent{
    @Input() packageSelected!: Lunch;
    @Output() packages!: Lunch;
    constructor(public dialog: MatDialog){}
    openDialog(){
        const dialogRef = this.dialog.open(LunchDetailsDialogComponent, { 
            data: this.packages 
    });
    dialogRef.afterClosed().subscribe(result => {
        this.packages = result;
    });
    }



}
