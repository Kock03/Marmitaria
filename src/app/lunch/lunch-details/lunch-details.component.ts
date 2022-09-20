import { ChangeDetectorRef, Component, Input, Output } from "@angular/core";
import { Lunch } from "../lunch.model";
import { LunchListComponent } from "../lunch-list/lunch-list.component";
import { LunchListDialogComponent } from "../lunch-list/lunch-list-dialog/lunch-list-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { LunchDetailsDialogComponent } from "./lunch-details-dialog/lunch-details-dialog.component";
import { reduce } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LunchReviewDialogComponent } from "./lunch-review-dialog/lunch-review-dialog.component";
import { Index, serverTimestamp } from "@firebase/firestore";
import { user } from "@angular/fire/auth";
import { AuthService } from "src/app/shared/services/auth.service";



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
    users!: any;
    usersEx!: any;
    userID!: any;
    bagIndex!: any;
    isBag!: boolean;
    @Input() packageSelected!: Lunch;
    @Input() packages!: any;
    constructor(public dialogDetail: MatDialog, private cdr: ChangeDetectorRef, private firestore: AngularFirestore, public authService: AuthService){}
    ngOnInit(): void {
        sessionStorage.setItem('value',  JSON.stringify(this.packageSelected.value));
        this.index = sessionStorage.getItem('index')
        this.sum = 0;
        let review = document.getElementById('bagCard') as HTMLButtonElement;
        let addBag = document.getElementById('addBag') as HTMLButtonElement;
        let editFood = document.getElementById('editFood') as HTMLButtonElement;
        if(this.authService.userData.uid == "yKPp5y7Yx4bYd8u1GM37HHeIcP32"){
            review.style.display = "none";
            addBag.style.display = "none";
        }else{
            editFood.style.display = "none";
        }
        this.firestore
        .collection('lunch')
        .snapshotChanges()
        .subscribe( (data) => {
        this.usersEx = data.map( (e) => {
        let data = e.payload.doc.data()
        return {
            id: e.payload.doc.id,
            datas: data,
        };
        });
    });
    this.userID = sessionStorage.getItem('index');
    this.bagIndex = JSON.parse(sessionStorage.getItem('arrayBagIndex')!);
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
        this.firestore.doc('lunch/' + this.userID).update({isBag : true});
    }
    
    openDialogReview(i: any){
        const dialogRef = this.dialogDetail.open(LunchReviewDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
            let resultFinal = JSON.parse(sessionStorage.getItem('bagValueFinal')!);
            this.sum = resultFinal;
            for(let i = this.packageName.length; i > 0; i--){
                this.packageName.pop();
            }
            for(let i = this.packageValue.length; i > 0; i--){
                this.packageValue.pop();
            }
            for(let i = this.packageImage.length; i > 0; i--){
                this.packageImage.pop();
            }
            let bagNameFinal = JSON.parse(sessionStorage.getItem('name')!);
            let bagValueFinal = JSON.parse(sessionStorage.getItem('value')!);
            let bagImageFinal = JSON.parse(sessionStorage.getItem('imageLink')!);
            this.packageName.push(bagNameFinal);
            this.packageValue.push(bagValueFinal);
            this.packageImage.push(bagImageFinal);
            sessionStorage.setItem('name', JSON.stringify(this.packageName))!;
            sessionStorage.setItem('valueBag', JSON.stringify(this.packageValue))!;
            sessionStorage.setItem('imageLink', JSON.stringify(this.packageImage))!;
        })
        if(this.sum == 0){
            sessionStorage.clear();
        }
        sessionStorage.setItem('value',JSON.stringify(this.sum))!; 
    }
}

