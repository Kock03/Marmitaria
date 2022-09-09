import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  constructor(public authService: AuthService, public dialogDetail: MatDialog){}


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
}
