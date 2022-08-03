import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Lunch } from '../lunch.model';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css']
})
export class LunchListComponent implements OnInit {

  packages: Lunch[] = [
    new Lunch('Churrasco', 'Churrasco de Picanha', 'https://blog.santamassa.com.br/wp-content/uploads/2019/04/284199-churrasco-americano-e-brasileiro-voce-sabe-as-diferencas.jpg'),
    new Lunch('Sushi', 'Combo de Sushi Salmão', 'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2021/11/sushi.jpg')
  ];

  @Output() packageWasSelected = new EventEmitter<Lunch>();

  constructor() { }

  ngOnInit(): void {
  }

  onPackageSelected(packageSelected: Lunch){
    this.packageWasSelected.emit(packageSelected);
  }

}
