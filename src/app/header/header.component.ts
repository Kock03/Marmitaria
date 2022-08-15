import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string){
    this.featureSelected.emit(feature)
  }
  ngOnInit(): void {
  }

  shutdown(){
    if(confirm("Você tem certeza que deseja fechar o site?")){
      window.open('', '_self', '');
      window.close();
    }
  }

  showMenu(){
    
  }

}
