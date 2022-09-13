import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) { }
  isChecked = true;
  boxMode: boolean = false;

  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string){
    this.featureSelected.emit(feature)
  }
  ngOnInit(): void {
    let user =  JSON.parse(localStorage.getItem("user")!);
    user.uid === "yKPp5y7Yx4bYd8u1GM37HHeIcP32" ? this.boxMode = true : this.boxMode = false;

  }

  shutdown(){
    if(confirm("Você tem certeza que deseja fechar o site?")){
      window.open('', '_self')?.close();
      // window.close();
    }
  }

  switchMode(){
    if(this.isChecked == false){
      sessionStorage.setItem('isChecked',  JSON.stringify(this.isChecked));
    }
  }

}
