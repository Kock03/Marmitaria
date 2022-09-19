import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Index } from '@firebase/firestore';

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
  constructor(private formBuilder: FormBuilder,private firestore: AngularFirestore) { 
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
      alert("Por favor, informe a tarefa!")
    }else{
      const taskValue = this.task.nativeElement.value;
      const isChecked = this.checked
      const newTask = {taskValue, isChecked}
      this.firestore.collection('to-do-list').add(newTask);
      this.myFormGroup.reset();
    }
  }

  checkTask(i: any){
    // let taskValue = document.getElementById('taskValue') as HTMLUListElement;
    // console.log("🚀 ~ file: to-do-list.component.ts ~ line 50 ~ ToDoListComponent ~ checkTask ~ taskValue", taskValue)
    // let checked = taskValue.style.textDecoration = "line-through";
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
