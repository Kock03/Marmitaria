import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { User } from '../shared/services/user';
import { LunchReviewDialogComponent } from '../lunch/lunch-details/lunch-review-dialog/lunch-review-dialog.component';
import { user } from '@angular/fire/auth';
import { ReportErrorDialogComponent } from '../report-error-dialog/report-error-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  constructor(public authService: AuthService, public dialogDetail: MatDialog, private firestore: AngularFirestore){}
  cartMode: boolean = false;
  amountIndex: any;
  id1: any;
  indexs: Array<any> = [];

  ngOnInit(): void {
    let user =  JSON.parse(localStorage.getItem("user")!);
    user.uid === "SHfa4hba4RaCMR78REr5mVTlxBD2" ? this.cartMode = false : this.cartMode = true;
  }
  loadedFeature = 'lunch';
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }

  openDialog(){
    const dialogRef = this.dialogDetail.open(ProfileDialogComponent, {
    });
  }

  reload(){
    location.reload();
  }

  openDialogDetail(){
    const dialogRef = this.dialogDetail.open(LunchReviewDialogComponent, {
    });
  }

  openDialogError(){
    const dialogRef = this.dialogDetail.open(ReportErrorDialogComponent, {});
  }

  restart(){}
}
