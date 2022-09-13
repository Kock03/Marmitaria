import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { User } from '../shared/services/user';
import { LunchReviewDialogComponent } from '../lunch/lunch-details/lunch-review-dialog/lunch-review-dialog.component';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  constructor(public authService: AuthService, public dialogDetail: MatDialog){}
  cartMode: boolean = false;

  ngOnInit(): void {
    let user =  JSON.parse(localStorage.getItem("user")!);
    user.uid === "yKPp5y7Yx4bYd8u1GM37HHeIcP32" ? this.cartMode = false : this.cartMode = true;

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
}
