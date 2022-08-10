import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lunch } from '../../lunch.model';

@Component({
  selector: 'app-lunch-item',
  templateUrl: './lunch-item.component.html',
  styleUrls: ['./lunch-item.component.css'],
})
export class LunchItemComponent implements OnInit {
  constructor() {}
  // exclamação foi posto para não dar erro de inicialização
  index!: any;
  @Input() package!: Lunch;
  @Input() packages!: any;
  @Output() packageSelected = new EventEmitter<void>();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.index = sessionStorage.getItem('index');
  }

  onSelected() {
    this.packageSelected.emit();
    sessionStorage.setItem('lunch', JSON.stringify(this.package));
  }

  removeLunch() {
    this.packageSelected.emit();
    sessionStorage.setItem('lunch', JSON.stringify(this.package));
    return this.delete.next(true);
    
  }

}
