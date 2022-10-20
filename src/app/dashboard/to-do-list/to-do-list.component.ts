import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Index } from '@firebase/firestore';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  
  myFormGroup: FormGroup;
  @ViewChild("task") task!: ElementRef;
  taskList!: any;
  checked: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  durationInSeconds = 3;
  constructor(private formBuilder: FormBuilder,private firestore: AngularFirestore, private snackBar: MatSnackBar) { 
    this.myFormGroup = this.formBuilder.group({
      task: ['', Validators.required],
      checked: ['false', Validators.required]
    });
  }


  ngOnInit(): void {
    this.firestore
    .collection('to-do-list')
    .snapshotChanges()
    .subscribe(async (data) => {
      this.taskList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          datas: e.payload.doc.data(),
        };
      });
    })
  }

  addTask(){
    if(this.task.nativeElement.value == ""){
      this.snackBar.open("Por favor, informe a tarefa!", "Fechar", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000
      })
    }else{
      const taskValue = this.task.nativeElement.value;
      const isChecked = this.checked
      const newTask = {taskValue, isChecked}
      this.firestore.collection('to-do-list').add(newTask);
      this.myFormGroup.reset();
    }
  }

  checkTask(i: any){
    if(this.checked == false) {
      this.checked = true;
      this.firestore.doc("to-do-list/" + i).update({isChecked: true});
    }else{
      this.checked = false;
      this.firestore.doc("to-do-list/" + i).update({isChecked: false});
    }

  }

  deleteTask(task: any){
    this.firestore.doc('to-do-list/' + task).delete();
  }

}
