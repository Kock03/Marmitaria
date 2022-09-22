import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
  admMode: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(){
    let adm = document.getElementById('adm') as HTMLParagraphElement;
    this.authService.userData.uid === "SHfa4hba4RaCMR78REr5mVTlxBD2" ? this.admMode = true : this.admMode = false;
  }

}
