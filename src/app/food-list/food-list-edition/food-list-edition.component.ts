import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from "@angular/core";
import { Food } from "src/app/shared/food.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";

@Component({
    selector : 'app-food-list-edition',
    templateUrl : './food-list-edition.component.html',
    styleUrls: ['./food-list-edition.component.css']

})

export class FoodListEditionComponent {

    food!: any;
    method: string = '';

    // a ! significa que o elemento vai começar sem valor
    @ViewChild("nameInput") nameInputRef!: ElementRef;
    @ViewChild("amountInput") amountInputRef!: ElementRef;
    @Output() foodAdded = new EventEmitter<Food>();
    @Output() foodEdited = new EventEmitter<Food>();
    @Input('edition')  foodEdit!: BehaviorSubject<any>; 
    
    meuFormGroup: FormGroup;
    constructor(private formBuilder: FormBuilder){
        this.meuFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    ngOnInit(): void{
        this.foodEdit.subscribe(res => {
            if(res){
                this.edition(res)
            }
        });
    }
    
    
    addFood(){
        this.method = sessionStorage.getItem('method')!;

        if(this.method === 'edit'){
            const foodName = this.nameInputRef.nativeElement.value;
            const foodAmount = this.amountInputRef.nativeElement.value;
            const newFood = new Food(foodName, foodAmount);
            this.foodEdited.emit(newFood);
            this.meuFormGroup.reset();
        }else{

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

    edition(data: any){
        this.meuFormGroup.controls['name'].setValue(data.name);
        this.meuFormGroup.controls['amount'].setValue(data.amount);
    }
}