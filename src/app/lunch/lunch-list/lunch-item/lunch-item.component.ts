import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lunch } from '../../lunch.model';

@Component({
  selector: 'app-lunch-item',
  templateUrl: './lunch-item.component.html', 
  styleUrls: ['./lunch-item.component.css']
})
export class LunchItemComponent implements OnInit {

  constructor() { }
  // exclamação foi posto para não dar erro de inicialização
  @Input() package!: Lunch;
  @Output() packageSelected = new EventEmitter<void>();
  ngOnInit(): void {
  }

  onSelected(){
    this.packageSelected.emit();
  }

}
