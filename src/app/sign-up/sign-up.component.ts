import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../shared/services/user';
import { Inject } from '@angular/core';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService) {}
  checked: boolean = false;
  @Input() example!: User;


  ngOnInit(): void {

  }

  slideToogleChecked(){
    if(this.checked == false) {
      this.checked = true;
    }else{
      this.checked = false;
    }
  }

  terms_of_use(userEmail: string, userPwd: string){
    let inputName = document.getElementById("name") as HTMLInputElement;
    if(this.checked == false) {
      alert("Por favor, aceite nossos termos de uso")
    }else{
      this.authService.SignUp(userEmail, userPwd)
      inputName.value = this.example.displayName;
      console.log("🚀 ~ file: sign-up.component.ts ~ line 41 ~ SignUpComponent ~ terms_of_use ~ this.example.displayName", this.example.displayName)
    }
  }

  isAdmin(){
    let checkbox = document.getElementById("check") as HTMLInputElement;
    if(checkbox.checked){

    }
  }

}
