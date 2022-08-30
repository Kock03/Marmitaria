import { Component, Input, OnInit } from '@angular/core';
import { Lunch } from '../../lunch.model';

@Component({
  selector: 'app-lunch-review-dialog',
  templateUrl: './lunch-review-dialog.component.html',
  styleUrls: ['./lunch-review-dialog.component.css']
})
export class LunchReviewDialogComponent implements OnInit {
  @Input() packageSelected!: Lunch;
  bagValue: number;
  bagName: any;


  constructor() { }

  ngOnInit(): void {
    this.bagValue = JSON.parse(sessionStorage.getItem('value')!);
    this.bagName = sessionStorage.getItem('name');
  }

}
