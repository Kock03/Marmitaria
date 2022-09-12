import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(){
    let adm = document.getElementById('adm') as HTMLParagraphElement;
    if(this.authService.userData.uid == "yKPp5y7Yx4bYd8u1GM37HHeIcP32"){
      adm.style.display = "block";
    }else{
      adm.style.display = "none";
    }
  }

}
