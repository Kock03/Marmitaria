import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../shared/services/user';
import { Inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService) {}
  checked: boolean = false;


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
    let name = document.getElementById('name') as HTMLInputElement;
    if(this.checked == false) {
      alert("Por favor, aceite nossos termos de uso")
    }else{
      this.authService.SignUp(userEmail, userPwd).then((res) =>{
        const user = firebase.auth().currentUser;
        return user?.updateProfile({
          displayName: name.value
        })
      })
    }
  }
}
