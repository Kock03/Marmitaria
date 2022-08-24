import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from "@angular/core";
import { Food } from "src/app/shared/food.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FoodListComponent } from "../food-list.component";

@Component({
    selector : 'app-food-list-edition',
    templateUrl : './food-list-edition.component.html',
    styleUrls: ['./food-list-edition.component.css']

})

export class FoodListEditionComponent {

    food!: any;
    method: string = '';
    foodID!: any;


    // a ! significa que o elemento vai começar sem valor
    @ViewChild("nameInput") nameInputRef!: ElementRef;
    @ViewChild("amountInput") amountInputRef!: ElementRef;
    @Output() foodAdded = new EventEmitter<Food>();
    @Output() foodEdited = new EventEmitter<Food>();
    @Input('edition')  foodEdit!: BehaviorSubject<any>;
     
    
    
    meuFormGroup: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private firestore: AngularFirestore){
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
        
        if(this.method === 'edit'){  
            const foodName = this.nameInputRef.nativeElement.value;
            const foodAmount = this.amountInputRef.nativeElement.value;
            const newFood = {foodName, foodAmount};
            this.foodID = sessionStorage.getItem('indexFood');
            this.firestore.doc('food/' + this.foodID).update(newFood);
            this.meuFormGroup.reset();
        }else{    
            if(!this.meuFormGroup.valid){ 
                return;
            } else{

                const foodName = this.nameInputRef.nativeElement.value;
                const foodAmount = this.amountInputRef.nativeElement.value;
                const newFood = {foodName, foodAmount};
                this.firestore.collection('food').add(newFood);
                this.meuFormGroup.reset();
            }
        }
        this.method = sessionStorage.setItem('method', '')!;
    }

    edition(value: any){
        this.method = sessionStorage.getItem('method')!;
        this.meuFormGroup.controls['name'].setValue(value.datas.foodName);
        this.meuFormGroup.controls['amount'].setValue(value.datas.foodAmount);
        sessionStorage.setItem('indexFood', value.id);
        // this.meuFormGroup.controls['amount'].setValue(data.datas.foodAmount);
    }

    changeColor(){
        if(this.method === 'edit'){
            let color = document.getElementById('button') as HTMLDivElement;
            color.style.color = "primary"
        }
    }
}