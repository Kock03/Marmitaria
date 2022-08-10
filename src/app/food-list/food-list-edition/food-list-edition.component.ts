import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { Food } from "src/app/shared/food.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector : 'app-food-list-edition',
    templateUrl : './food-list-edition.component.html',
    styleUrls: ['./food-list-edition.component.css']

})

export class FoodListEditionComponent {

    
    meuFormGroup: FormGroup;
    constructor(private formBuilder: FormBuilder){
        this.meuFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    // a ! significa que o elemento vai começar sem valor
    @ViewChild("nameInput") nameInputRef!: ElementRef;
    @ViewChild("amountInput") amountInputRef!: ElementRef;
    @Output() foodAdded = new EventEmitter<Food>();

    addFood(){
        if(!this.meuFormGroup.valid){ 
            return;
        } else{
            const foodName = this.nameInputRef.nativeElement.value;
            const foodAmount = this.amountInputRef.nativeElement.value;
            const newFood = new Food(foodName, foodAmount);
            this.foodAdded.emit(newFood);
            this.meuFormGroup.reset();
        }
    }

   

}