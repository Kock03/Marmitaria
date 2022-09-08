import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  constructor(public authService: AuthService){}

  loadedFeature = 'lunch';
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
