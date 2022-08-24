import { Component, OnInit } from '@angular/core';
import { Lunch } from './lunch.model';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {

  selectedPackage!: Lunch;
  switch!: any

  constructor() { }

  ngOnInit(): void {
    let template = document.getElementById('info') as HTMLDivElement;
    setTimeout(() => {
      template.style.display = 'block';
    }, 5000);

    this.switch = sessionStorage.getItem('isChecked');
    setInterval(() => {
      if(this.switch == 'true'){
        let darkMode = document.getElementById('row') as HTMLDivElement;
        darkMode.style.backgroundColor = 'black';
      }
    }, 1000);
  }
  
}
