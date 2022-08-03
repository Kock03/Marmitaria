import { Component, Input } from "@angular/core";
import { Lunch } from "../lunch.model";

@Component({
    selector : 'app-lunch-details',
    templateUrl : './lunch-details.component.html',
    styleUrls: ['./lunch-details.component.css']
    
})

export class LunchDetailsComponent{
    @Input() packageSelected!: Lunch;
}